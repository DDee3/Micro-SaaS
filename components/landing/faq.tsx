import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I connect my own Stripe account?",
    answer:
      "Simply copy your Stripe Secret Key, Publishable Key, and Webhook Secret into your .env.local file. We have mapped out every environment variable in `.env.example`.",
  },
  {
    question: "How does the Supabase authentication work?",
    answer:
      "Authentication is handled via `@supabase/ssr`. When a user registers or logs in with Google OAuth or Email/Password, Supabase creates the user in `auth.users`, and our SQL trigger instantly creates their profile in `public.profiles`.",
  },
  {
    question: "Can I sell or customize this starter kit for clients?",
    answer:
      "Yes! You have 100% ownership of your code. You can use it as a foundation for your own Micro-SaaS projects, client work, or commercial software.",
  },
  {
    question: "What happens when a customer cancels their subscription?",
    answer:
      "Stripe immediately sends a `customer.subscription.deleted` webhook to `/api/stripe/webhook`. Our API handler updates their row in `profiles` to 'canceled', disabling paid access automatically.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 relative border-t border-border/40">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything you need to know
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have questions before deploying? Here are the most common inquiries.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-card/40 border-border/60">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

