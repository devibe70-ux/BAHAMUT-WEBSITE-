# Product & Technical Requirement Document (PRD & TRD)
## Project Name: BahaMut by DE VIBE E-Commerce Overhaul
**Domain Target**: `https://bahamut.in`  
**Parent / Fulfillment Entity**: DE VIBE (Ambawadi, Ahmedabad, Gujarat - 380015)  
**Primary Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Vercel, Cashfree Payments API, Shipyaari API, Delhivery Direct API  

---

## 1. Executive Summary & Brand Identity Rules
- **Brand Spelling Standard**: The brand name MUST always be rendered as `BahaMut` with strict capitalization across all UI components, meta tags, and invoice documents.
- **Sub-Branding Lockup**: Standard header sub-brand: `BahaMut by DE VIBE`.
- **Legal Line Enforcement**: The global footer, invoice templates, order emails, and payment modals MUST display:
  `© 2026 DE VIBE. Marketed, billed, and fulfilled by DE VIBE (GSTIN: 24ASHPS9777R1ZE).`
- **Target Audience**: Men aged 13 to 65 across India.
- **Core Value Proposition**: Direct-from-manufacturer 100% Breathable Woven Cotton apparel engineered at Ahmedabad textile mills.

---

## 2. Product Requirement Document (PRD)

### 2.1 Core User Journeys
1. **Shopper Discovery**
   - Visitor lands on homepage -> Navigates categories by sizing units (`Jeans — Waist 28–38`, `Shirts — Collar 38–46 cm`, `T-Shirts — Chest S–XXL`).
   - Interactive fit assistant allows exact measurement verification (Inches/CM).
2. **Guest-First Single-Page Mobile Checkout & Partial COD Flow**
   - Shopper enters shipping details -> Chooses between **Full Prepaid (5% Instant Discount)** or **Partial Cash on Delivery**.
   - If Partial COD selected, Cashfree charges a flat **₹200 advance deposit** online (via UPI Intent / Cards).
   - Upon deposit verification, order dispatches with `cod_amount = Total Price - 200`.
3. **Post-Purchase Order Tracking**
   - Shopper visits `/track/[orderId]` -> Sees real-time shipment milestones + remaining cash balance due at doorstep.

### 2.2 Site Map & Route Architecture
- `/` - Dynamic Homepage (Hero, Category Strip, Featured Collection, How Partial COD Works, Why BahaMut)
- `/catalog` - Filterable Catalog (Size, Category, Price)
- `/product/[slug]` - Product Detail Page (PDP with image zoom, GSM specs, pincode delivery date lookup, sticky buy bar)
- `/cart` & `/checkout` - Guest-first single-page checkout with Cashfree UPI Intent & Partial COD integration
- `/track/[orderId]` - Public customer tracking milestone page
- `/admin/login` - Secure seller authentication
- `/admin/orders` - Order management, AWB generation, and status filters

---

## 3. Technical Requirement Document (TRD)

### 3.1 Infrastructure & Architecture
- **Framework**: Next.js 14 App Router (React 18 Server Components)
- **Deployment**: Vercel Edge Network
- **Payment Gateway**: Cashfree Payments API (v3 Web SDK + Server-Side Verification)
- **Shipping Integration**: Shipyaari Primary API with Delhivery Direct Failover

### 3.2 Database Schema (Prisma / SQL)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'CUSTOMER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  target_demographic VARCHAR(50) NOT NULL,
  fabric_details VARCHAR(255) DEFAULT '100% Woven Cotton',
  price NUMERIC(10,2) NOT NULL,
  original_mrp NUMERIC(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  images TEXT[] NOT NULL,
  sizes VARCHAR(10)[] DEFAULT ARRAY['28', '30', '32', '34', '36', '38'],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_status VARCHAR(50) NOT NULL,
  payment_type VARCHAR(50) NOT NULL,
  advance_amount NUMERIC(10,2) DEFAULT 0.00,
  cod_balance_due NUMERIC(10,2) DEFAULT 0.00,
  total_amount NUMERIC(10,2) NOT NULL,
  cashfree_order_id VARCHAR(255),
  cashfree_payment_id VARCHAR(255),
  courier_provider VARCHAR(100),
  awb_number VARCHAR(100),
  fulfillment_status VARCHAR(50) DEFAULT 'UNFULFILLED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Security & Compliance Architecture

### 4.1 Environment Variable Guardrails (`.env.local`)

```env
# SERVER ONLY
CASHFREE_APP_ID=cf_live_app_id_here
CASHFREE_SECRET_KEY=cf_live_secret_key_here
CASHFREE_ENV=PRODUCTION
SHIPYAARI_API_KEY=shipyaari_api_key_here
DELHIVERY_API_TOKEN=delhivery_token_here

# PUBLIC CLIENT VARIABLES
NEXT_PUBLIC_APP_URL=https://bahamut.in
```

### 4.2 Cashfree Webhook Verification
All checkout callbacks perform server-side API validation (`/api/cashfree/verify`) to confirm order payment status before marking orders paid in local storage or database.
