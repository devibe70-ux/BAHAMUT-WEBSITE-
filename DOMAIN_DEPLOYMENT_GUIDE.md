# Custom Domain Deployment Guide for `https://bahamut.in`

This document details the exact steps required to deploy the **BahaMut by De Vibe** e-commerce website to Vercel and bind your custom domain **`https://bahamut.in`**.

---

## 1. Vercel One-Click Project Deployment

1. Open **[Vercel Dashboard](https://vercel.com/new)** and log in.
2. Select **"Import Repository"** and select `BAHAMUT WEBSITE SOURCE CODE`.
3. Set **Framework Preset**: `Next.js`.
4. Under **Environment Variables**, add the following 4 production variables:

| Key | Value | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | `https://bahamut.in` | Production App Canonical Origin |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_THqZNN253oUslA` | Live Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | `pl9ZhXYXhxp6FygjfHcV13IE` | Live Razorpay Key Secret |
| `SHIPYAARI_API_KEY` | `sy_live_8849102_key` | Shipyaari Primary API Key |

5. Click **Deploy**. Vercel will build and assign a production URL (e.g. `bahamut.vercel.app`).

---

## 2. Bind Custom Domain `bahamut.in` on Vercel

1. In your Vercel Project Dashboard, navigate to **Settings** -> **Domains**.
2. Type **`bahamut.in`** and click **Add**.
3. Select **"Add `bahamut.in` and `www.bahamut.in` (recommended redirect)"**.

---

## 3. DNS Records Configuration (GoDaddy / Hostinger / Cloudflare)

In your Domain Registrar DNS Management Console (GoDaddy / Hostinger / Cloudflare / Namecheap), add the following DNS records for **`bahamut.in`**:

### A Record (Apex Domain `@`)
- **Type**: `A`
- **Name**: `@` (or `bahamut.in`)
- **Value**: `76.76.21.21`
- **TTL**: `Auto` / `3600`

### CNAME Record (`www` Subdomain)
- **Type**: `CNAME`
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`
- **TTL**: `Auto` / `3600`

---

## 4. Live Razorpay Webhook Origin

Once `https://bahamut.in` is active and SSL is issued by Vercel (takes ~2 minutes):

1. Log into **[Razorpay Dashboard](https://dashboard.razorpay.com/)**.
2. Navigate to **Settings** -> **Webhooks** -> **Add New Webhook**.
3. Set **Webhook URL**: `https://bahamut.in/api/razorpay/verify`.
4. Active Events: `order.paid`, `payment.authorized`, `payment.failed`.

---

## 5. Verification Checklist

- [x] Canonical metadataBase configured as `https://bahamut.in`.
- [x] OpenGraph URLs set to `https://bahamut.in`.
- [x] Razorpay live credentials (`rzp_live_THqZNN253oUslA`) bound to environment.
- [x] Indian RTO-Proof validation engine active on checkout.
- [x] Partial COD deposit system active.
