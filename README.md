# 🚀 LaunchSaaS - Premium Micro-SaaS Starter Kit

A production-grade, sellable **Next.js 14+ (App Router)** boilerplate built with **TypeScript**, **Tailwind CSS**, **Shadcn UI**, **Supabase Auth & Database**, and **Stripe Recurring Billing**.

Save **40+ hours** of setup work. Start building your core product features immediately.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) + Radix UI Primitives + Lucide Icons
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Row-Level-Security + `@supabase/ssr`)
- **Billing & Subscriptions**: [Stripe](https://stripe.com/) (Checkout, Webhooks, Customer Portal)
- **Deployment**: [Vercel](https://vercel.com/) ready

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/                  # Auth route group
│   │   ├── layout.tsx           # Centered authentication layout
│   │   ├── login/page.tsx       # Email/Password + Google OAuth login
│   │   ├── signup/page.tsx      # Registration with automatic profile creation
│   │   ├── reset-password/      # Password reset trigger page
│   │   └── update-password/     # Password update page
│   ├── (dashboard)/             # Protected route group
│   │   ├── layout.tsx           # Server layout checking session & profile
│   │   └── dashboard/page.tsx   # Dashboard displaying subscription status & portal
│   ├── api/
│   │   ├── auth/callback/       # Supabase OAuth and email verification callback
│   │   └── stripe/
│   │       ├── checkout/        # Stripe Checkout session creator
│   │       ├── portal/          # Stripe Customer Billing Portal redirect
│   │       └── webhook/         # Stripe webhook listener
│   ├── globals.css              # Dark/Light theme CSS variables
│   ├── layout.tsx               # Root HTML and metadata
│   └── page.tsx                 # Modern Landing Page (Hero, Features, Pricing, FAQ, Footer)
├── components/
│   ├── auth/                    # OAuth & Form divider components
│   ├── dashboard/               # Dashboard Nav, User Dropdown, Portal Button
│   ├── landing/                 # Hero, Features, Pricing toggle, FAQ, Footer
│   └── ui/                      # Shadcn UI primitives (Button, Card, Input, Switch, Badge, etc.)
├── lib/
│   ├── stripe/                  # Stripe client SDK and plan configurations
│   ├── supabase/                # Supabase browser, server, admin, and middleware clients
│   └── utils.ts                 # Styling and format utilities
├── supabase/
│   └── schema.sql               # Database migration (Profiles table, RLS, triggers)
├── middleware.ts                # Route protection & Supabase session refresh
├── .env.example                 # Environment configuration template
└── README.md                    # Documentation & setup instructions
```

---

## 🚀 Quickstart Guide

### 1. Install Dependencies

In the project root, run:

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

---

## 🗄️ Supabase Configuration (Step-by-Step)

### Step 1: Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Under **Project Settings -> API**, copy:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API anon public key** -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Project API service_role key** -> `SUPABASE_SERVICE_ROLE_KEY` *(Never expose this to the browser)*.

### Step 2: Run Database Schema Script
1. Navigate to your Supabase Dashboard -> **SQL Editor**.
2. Click **New Query**.
3. Open the file `supabase/schema.sql` from this starter kit, copy the entire SQL script, paste it into the editor, and click **Run**.
4. This script sets up:
   - The `public.profiles` table linked to `auth.users` on cascade delete.
   - The `subscription_status` column (default: `'free'`).
   - The automatic Postgres trigger `handle_new_user()` that creates a profile on every signup.
   - Row-Level-Security (RLS) policies allowing users to read and update their own records.

### Step 3: Configure Auth Redirect URLs
1. In your Supabase Dashboard, go to **Authentication -> URL Configuration**.
2. Set **Site URL** to:
   ```
   http://localhost:3000
   ```
3. Add to **Redirect URLs**:
   ```
   http://localhost:3000/api/auth/callback
   http://localhost:3000/update-password
   https://yourdomain.com/api/auth/callback
   https://yourdomain.com/update-password
   ```

### Step 4: (Optional) Google OAuth Setup
1. In the Supabase Dashboard, go to **Authentication -> Providers -> Google**.
2. Enable Google and enter your `Client ID` and `Client Secret` from the [Google Cloud Console](https://console.cloud.google.com/).
3. Add the Supabase callback URL into your Google Cloud Authorized redirect URIs.

---

## 💳 Stripe Configuration (Step-by-Step)

### Step 1: Stripe API Keys
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).
2. Copy your keys into `.env.local`:
   - **Publishable key** -> `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** -> `STRIPE_SECRET_KEY`

### Step 2: Create Subscription Products
1. In the Stripe Dashboard, go to **Product Catalog** -> **Add Product**.
2. Create your **Pro** product:
   - Add a **Monthly** recurring price (e.g. $29/month). Copy the Price ID (`price_...`) to `NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID`.
   - Add a **Yearly** recurring price (e.g. $290/year). Copy the Price ID (`price_...`) to `NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID`.
3. Create your **Enterprise** product:
   - Copy the respective price IDs to `NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID` and `NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID`.

### Step 3: Enable the Stripe Customer Portal
1. In the Stripe Dashboard, go to **Settings -> Billing -> Customer portal**.
2. Click **Activate link**.
3. Choose what features customers can manage (e.g., switch plans, cancel subscriptions, update payment methods, view invoices).
4. Save changes.

### Step 4: Test Stripe Webhooks Locally
To test checkout and subscription cancellations locally:
1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Login to your account:
   ```bash
   stripe login
   ```
3. Forward webhook events to your local server:
   ```bash
   npm run stripe:listen
   # or: stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copy the webhook signing secret outputted by the CLI (starts with `whsec_...`) and paste it into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## 💻 Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see your landing page.

- **Landing page**: `http://localhost:3000`
- **Sign in**: `http://localhost:3000/login`
- **Sign up**: `http://localhost:3000/signup`
- **Protected Dashboard**: `http://localhost:3000/dashboard`

---

## 🚢 Production Deployment (Vercel)

1. Push your repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com/new).
3. In Project Settings -> **Environment Variables**, add all keys from your `.env.local`:
   - `NEXT_PUBLIC_APP_URL` (e.g., `https://your-domain.com`)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - All Stripe Price IDs
4. In your **Stripe Dashboard -> Developers -> Webhooks**:
   - Add an endpoint: `https://your-domain.com/api/stripe/webhook`
   - Listen to events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the endpoint secret into Vercel's `STRIPE_WEBHOOK_SECRET`.

---

## 📄 License & Commercial Rights

Purchasing this starter kit gives you a perpetual, commercial license to create and sell unlimited SaaS products, applications, and client projects. You may not resell or redistribute this starter kit as a template or boilerplate in its original form.

