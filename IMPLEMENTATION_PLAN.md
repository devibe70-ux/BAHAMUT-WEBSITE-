# Product & Technical Requirement Document (PRD & TRD)
## Project Name: BahaMut by De Vibe E-Commerce Overhaul
**Domain Target**: `https://bahamut.in`  
**Parent / Fulfillment Entity**: De Vibe (Revdi Bazar, Kalupur, Ahmedabad, Gujarat)  
**Primary Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Vercel, Supabase (PostgreSQL), Razorpay, Shipyaari API, Delhivery Direct API  

---

## 1. Executive Summary & Brand Identity Rules
- **Brand Spelling Standard**: The brand name MUST always be rendered as `BahaMut` with strict camel-case capitalization across all UI components, meta tags, and invoice documents.
- **Sub-Branding Lockup**: Standard header sub-brand: `BahaMut by De Vibe`.
- **Legal Line Enforcement**: The global footer, invoice templates, order emails, and payment modals MUST display:
  `© 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.`
- **Target Audience**: Men aged 13 to 65 across India (Segmented into 13–25 Youth Prints/Streetwear and 26–65 Structured Woven Solids).
- **Core Value Proposition**: Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad's textile hub.

---

## 2. Product Requirement Document (PRD)

### 2.1 Core User Journeys
1. **Shopper Discovery (13–65 Age Segmented)**
   - Visitor lands on homepage -> Selects age/style track ("Youth Casuals" vs "Classic Solids") or browses unified grid.
   - Interactive size guide modal allows exact fit verification (Inches/CM) to eliminate returns.
2. **Checkout & Partial COD Flow**
   - Shopper enters shipping details -> Chooses between **Prepaid (Free Delivery / Instant Discount)** or **Partial Cash on Delivery**.
   - If Partial COD selected, Razorpay charges a fixed **₹200 advance deposit**.
   - Upon ₹200 verification, order dispatches to courier with `cod_amount = Total Price - 200`.
3. **Post-Purchase Order Tracking**
   - Shopper visits `/track/[orderId]` -> Sees real-time shipment milestones (Shipyaari/Delhivery sync) + remaining cash balance due at doorstep.
4. **Seller Operations (De Vibe Dashboard)**
   - Admin logs into `/admin` -> Uses AI product creation tool to publish new products in <60 seconds.
   - Admin verifies deposit status, generates AWB waybills, and downloads GST Tax Invoices.

### 2.2 Site Map & Route Architecture
- `/` - Dynamic Homepage (Hero, Dual Categories, Featured Carousel, Trust Pillars)
- `/catalog` - Filterable Catalog (Size, Fit, Sleeve, Pattern, Price, Demographic)
- `/product/[slug]` - Product Detail Page (PDP with image zoom, size assistant, sticky buy bar)
- `/cart` & `/checkout` - High-conversion checkout with Razorpay Partial COD integration
- `/track/[orderId]` - Public customer tracking milestone page
- `/admin/login` - Secure seller authentication
- `/admin/orders` - Order management, AWB generation, and status filters
- `/admin/products/new` - AI-Assisted product cataloging questionnaire

---

## 3. Technical Requirement Document (TRD)

### 3.1 Infrastructure & Architecture
- **Framework**: Next.js 14 App Router (React 18 Server Components)
- **Deployment**: Vercel Edge Network (Auto-scaling Serverless Edge Functions)
- **Database**: Supabase / Neon PostgreSQL with serverless connection pooling
- **Media Storage & Pipeline**: Next/Image + Cloudinary WebP auto-formatting
- **Authentication**: NextAuth.js / Supabase Auth (JWT-based role protection for `/admin`)

### 3.2 Database Schema (Prisma / SQL)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'CUSTOMER', -- 'ADMIN' or 'CUSTOMER'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_demographic VARCHAR(50) NOT NULL, -- 'YOUTH' (13-25) or 'CLASSIC' (26-65)
  fabric_details VARCHAR(255) DEFAULT '100% Woven Cotton',
  price NUMERIC(10,2) NOT NULL,
  original_mrp NUMERIC(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  images TEXT[] NOT NULL,
  sizes VARCHAR(10)[] DEFAULT ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., BM-2026-1001
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_status VARCHAR(50) NOT NULL, -- 'PENDING', 'DEPOSIT_PAID', 'FULLY_PAID'
  payment_type VARCHAR(50) NOT NULL,   -- 'PREPAID', 'PARTIAL_COD'
  advance_amount NUMERIC(10,2) DEFAULT 0.00,
  cod_balance_due NUMERIC(10,2) DEFAULT 0.00,
  total_amount NUMERIC(10,2) NOT NULL,
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  courier_provider VARCHAR(100),       -- 'Shipyaari' or 'Delhivery Direct'
  awb_number VARCHAR(100),
  fulfillment_status VARCHAR(50) DEFAULT 'UNFULFILLED', -- 'DISPATCHED', 'DELIVERED', 'RTO'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.3 Shipping API Failover Integration Logic (`/api/shipping/dispatch`)

1. Receive verified order payload from Razorpay webhook / admin action.
2. **Primary Execution**: POST payload to Shipyaari API (`https://parentapi.shipyaari.com/Awb/insertOrder`).
* If response `status === 'success'` and `awb_number` exists -> Save AWB and return `Provider: Shipyaari`.


3. **Backup Execution (Failover)**: If Shipyaari fails or times out (>3000ms):
* POST payload to Delhivery Express CMU API (`https://track.delhivery.com/api/cmu/create.json`).
* Save returned Delhivery waybill and return `Provider: Delhivery (Backup)`.



---

## 4. UI/UX, CSS & Design System Specifications

### 4.1 Tailwind Color Palette & Theme Config

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#121212',      // Deep Charcoal Background/Text
          light: '#F8F9FA',     // Off-white canvas
          card: '#FFFFFF',      // Product card container
          indigo: '#2563EB',    // Primary action accent
          emerald: '#059669',   // Trust badges & verified indicators
          muted: '#64748B',     // Secondary subtitles
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      minHeight: {
        touch: '48px',        // Accessibility touch standard for mobile
      }
    },
  },
  plugins: [],
}
```

### 4.2 Key Styling Guidelines

* **High Contrast Readability**: Body text MUST be high contrast (`#121212` on `#FFFFFF` or `#F8F9FA`) to accommodate shoppers aged 40–65.
* **Mobile First Spacing**: Pinned sticky bottom CTA bar on product pages for mobile screen sizes (`position: fixed; bottom: 0;`).
* **Touch Standard**: All buttons, size selection swatches, and menu links must have minimum dimensions of `48px x 48px`.

---

## 5. Security & Compliance Architecture

### 5.1 Environment Variable Guardrails (`.env.local`)

```env
# SERVER ONLY (NEVER EXPOSE TO CLIENT)
RAZORPAY_KEY_SECRET=rzp_live_secret_key_here
SHIPYAARI_API_KEY=shipyaari_api_key_here
DELHIVERY_API_TOKEN=delhivery_token_here
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=super_secret_jwt_key_2026

# PUBLIC CLIENT VARIABLES
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_key_id_here
NEXT_PUBLIC_APP_URL=https://bahamut.in
```

### 5.2 Payment Verification Security (HMAC SHA256)

All Razorpay checkout callbacks MUST perform backend signature validation before updating the database or dispatching order payloads to courier APIs:

```typescript
const body = razorpay_order_id + '|' + razorpay_payment_id;
const expectedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  .update(body.toString())
  .digest('hex');

if (expectedSignature !== razorpay_signature) {
  throw new Error('SECURITY ALERT: Invalid Payment Signature');
}
```

### 5.3 Web Security Standards

* **HTTPS Enforcement**: SSL certificate via Vercel Edge.
* **Content Security Policy (CSP)**: Restrict external script execution exclusively to Razorpay (`https://checkout.razorpay.com`) and Cloudinary domain sources.
* **Route Protection**: Admin routes `/admin/*` protected via Next.js Server Middleware verifying JWT signatures.

---

## 6. Antigravity Agent Execution Instructions

To the Antigravity Agent: Follow these steps in exact order to build the codebase:

1. **Scaffold Next.js 14 App Router**:
* Initialize project structure with TypeScript, Tailwind CSS, App Router, and Lucide Icons.


2. **Setup UI Theme**:
* Update `tailwind.config.js` and `app/globals.css` with the design tokens specified in Section 4.


3. **Build Core Components**:
* Create Header, Announcement Bar, Footer (with De Vibe billing lockup), Product Cards, and Size Chart Modal.


4. **Implement Payment API**:
* Build `/api/razorpay/order/route.ts` and `/api/razorpay/verify/route.ts` incorporating the ₹200 Partial COD deposit logic.


5. **Implement Shipping API Failover**:
* Build `/api/shipping/dispatch/route.ts` executing primary Shipyaari API call with fallback to Delhivery Direct API.


6. **Build AI Product Creation Admin Panel**:
* Build `/admin/products/new` with quick input form and Gemini API integration for auto-generating product titles, descriptions, and size charts.


7. **Build Customer Order Tracking**:
* Build `/track/[orderId]` featuring live status milestone bar and balance due readouts.


8. **Verify & Build**:
* Execute `npm run build` and launch dev server to verify all pages and API endpoints operate without errors.
