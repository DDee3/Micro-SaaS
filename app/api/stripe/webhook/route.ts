import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface SubscriptionPeriodItem {
  current_period_end?: number;
}

function getPeriodEndTimestamp(subscription: Stripe.Subscription): string {
  const item = subscription.items?.data[0] as unknown as SubscriptionPeriodItem | undefined;
  const legacyPeriodEnd = (subscription as unknown as { current_period_end?: number }).current_period_end;
  const periodEnd = item?.current_period_end ?? legacyPeriodEnd;

  return periodEnd
    ? new Date(periodEnd * 1000).toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid webhook signature";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        const userId =
          session.metadata?.userId ||
          (session as { subscription_data?: { metadata?: { userId?: string } } }).subscription_data?.metadata?.userId;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0]?.price.id;

          const updateData = {
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            stripe_price_id: priceId,
            subscription_status: subscription.status,
            subscription_period_end: getPeriodEndTimestamp(subscription),
          };

          if (userId) {
            const { error } = await supabaseAdmin
              .from("profiles")
              .update(updateData)
              .eq("id", userId);

            if (error) {
              console.error("Failed to update profile by userId:", error.message);
            }
          } else if (customerId) {
            const { error } = await supabaseAdmin
              .from("profiles")
              .update(updateData)
              .eq("stripe_customer_id", customerId);

            if (error) {
              console.error("Failed to update profile by customerId:", error.message);
            }
          }

          revalidatePath("/dashboard");
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price.id;
        const userId = subscription.metadata?.userId;

        const subUpdateData = {
          stripe_subscription_id: subscription.id,
          stripe_price_id: priceId,
          subscription_status: subscription.status,
          subscription_period_end: getPeriodEndTimestamp(subscription),
        };

        if (userId) {
          const { error } = await supabaseAdmin
            .from("profiles")
            .update(subUpdateData)
            .eq("id", userId);

          if (error) {
            console.error(`Failed to update subscription for user ${userId}:`, error.message);
          }
        } else if (customerId) {
          const { error } = await supabaseAdmin
            .from("profiles")
            .update(subUpdateData)
            .eq("stripe_customer_id", customerId);

          if (error) {
            console.error(`Failed to update subscription for customer ${customerId}:`, error.message);
          }
        }

        revalidatePath("/dashboard");
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: "canceled",
            stripe_subscription_id: null,
            stripe_price_id: null,
          })
          .eq("stripe_customer_id", customerId);

        if (error) {
          console.error("Failed to cancel subscription in database:", error.message);
        }

        revalidatePath("/dashboard");
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;
        const customerId = invoice.customer as string;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          const { error } = await supabaseAdmin
            .from("profiles")
            .update({
              subscription_status: subscription.status,
              subscription_period_end: getPeriodEndTimestamp(subscription),
            })
            .eq("stripe_customer_id", customerId);

          if (error) {
            console.error("Failed to sync invoice payment success:", error.message);
          }

          revalidatePath("/dashboard");
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: "past_due",
          })
          .eq("stripe_customer_id", customerId);

        if (error) {
          console.error("Failed to record past_due invoice status:", error.message);
        }

        revalidatePath("/dashboard");
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Webhook handler failed";
    console.error("Error processing Stripe webhook:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
