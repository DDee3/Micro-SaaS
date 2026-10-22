const faqs = [
  {
    question: "How do I connect my Stripe and Supabase accounts?",
    answer:
      "Duplicate `.env.example` to `.env.local` and add your Supabase Project URL, Anon Key, Service Role Key, and Stripe Secret keys. Run `supabase/schema.sql` in your Supabase SQL editor to create the profiles table and auth triggers.",
  },
  {
    question: "How does the Stripe Customer Portal work?",
    answer:
      "When users click 'Manage Billing', an API request calls `/api/stripe/portal`, generating a secure single-use Stripe billing session. Customers can change their credit card, view past invoices, upgrade, or cancel their subscription directly.",
  },
  {
    question: "Can I use this starter kit to sell multiple SaaS apps?",
    answer:
      "Yes. You receive a perpetual commercial license to create, deploy, and sell unlimited micro-SaaS applications or client projects with zero royalties.",
  },
  {
    question: "How does the middleware protect dashboard routes?",
    answer:
      "The Next.js Edge Middleware (`middleware.ts`) refreshes the Supabase user session on every request and intercepts unauthorized traffic heading to `/dashboard`, redirecting visitors to `/login` before any page components render.",
  },
  {
    question: "Are database migrations included?",
    answer:
      "Yes. The `supabase/schema.sql` file contains the exact PostgreSQL schema, indexes, automated signup triggers (`handle_new_user`), and strict Row Level Security (RLS) policies.",
  },
  {
    question: "How do I test webhooks on localhost?",
    answer:
      "Use the Stripe CLI with `npm run stripe:listen` to forward webhook events directly to `http://localhost:3000/api/stripe/webhook` and test checkout and subscription cancellations in real-time.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-28 md:py-36 relative border-t border-white/[0.06] bg-[#090a0c]">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mb-16 text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-zinc-100 leading-tight">
            Common questions & architecture details
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Everything you need to know about the starter kit stack, licenses, and deployment.
          </p>
        </div>

        {/* 2-Column Clean Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/[0.07] bg-zinc-950/40 hover:border-white/15 transition-all duration-200"
            >
              <h3 className="text-base font-medium text-zinc-100 tracking-tight">
                {faq.question}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
