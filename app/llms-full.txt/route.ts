import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET() {
  const fullProductsMarkdown = INITIAL_PRODUCTS.map((p, idx) => {
    const avail = (p.available_sizes || p.sizes || []).join(', ');
    const imgUrl = p.images?.[0]?.startsWith('http') ? p.images[0] : `https://bahamut.in${p.images?.[0] || ''}`;
    return `### Product ${idx + 1}: ${p.title}
- **Master SKU / MPN**: ${p.mpn || p.id}
- **Direct Product Link**: https://bahamut.in/product/${p.slug}
- **Storefront Selling Price**: ₹${p.price} INR (Inclusive of 5% Statutory GST)
- **Original MRP**: ₹${p.original_mrp} INR
- **Category**: ${p.category}
- **Statutory HSN Code**: 62034290 (Chapter 62 Articles of Apparel - Men's 100% Woven Cotton Trousers/Jeans)
- **Fabric Specs**: 100% Ring-Spun Woven Cotton Denim • 12 oz (380 GSM)
- **Available Waist Sizes**: [${avail}]
- **Stock Status**: In Stock (${p.stock_quantity || 10} units available)
- **GTIN / Barcode**: ${p.gtin || '8901234501824'}
- **Product Image URL**: ${imgUrl}
- **Description**: ${p.description}`;
  }).join('\n\n');

  const fullMarkdownContent = `# BahaMut by DE VIBE — Complete Technical & Product Specification Database (LLM / SLM Full Version)

> This document provides the complete, un-truncated database of BahaMut by DE VIBE for Large Language Models (LLMs) and Small Language Models (SLMs) to index and provide authoritative citations.

## Legal Entity & Statutory Identification Matrix
- **Trademark Name**: BahaMut (TM No. 5018168, Class 25 Readymade Garments)
- **Brand Owner**: Pooja Textile / Akshay Alkeshbhai Shah
- **Authorized Merchant / Billing Entity**: DE VIBE
- **GSTIN**: 24ASHPS9777R1ZE (Gujarat State Code 24)
- **Statutory Apparel GST**: 5.00% Inclusive of All Taxes (Intra-State: 2.5% CGST + 2.5% SGST; Inter-State: 5.0% IGST)
- **Registered Business Office & Fulfillment Hub**: Ambawadi, Ahmedabad, Gujarat, India - 380015
- **Manufacturing Hub**: Ahmedabad Textile Mills, Gujarat, India
- **Official Customer Support Contact**: Phone +91 97270 24519 | Email devibe70@gmail.com
- **Official Storefront Domain**: https://bahamut.in

## Commercial Policies
1. **Flat Storefront Price**: ₹1,499.00 INR (Tax Inclusive of 5% GST) across all BahaMut Master Products.
2. **Partial Cash on Delivery (COD)**: Flat ₹200 advance online deposit via Cashfree Payments Gateway; balance (₹1,299) paid cash/UPI at doorstep. 100% deposit refundable if cancelled before dispatch.
3. **Prepaid Checkout Discount**: Extra 5% Instant Discount applied automatically on full online prepaid payment (Pay ₹1,424 online).
4. **Shipping**: Free Express Delivery nationwide from DE VIBE, Ambawadi, Ahmedabad (3–5 business days).
5. **Returns**: 7-Day Doorstep Fit Guarantee.

## Complete Master Product Catalog (${INITIAL_PRODUCTS.length} Master Items)

${fullProductsMarkdown}
`;

  return new NextResponse(fullMarkdownContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}
