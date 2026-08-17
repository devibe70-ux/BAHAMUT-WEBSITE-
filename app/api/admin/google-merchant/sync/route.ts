import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { merchantEmail = 'bahamut.india@gmail.com', brandName = 'BahaMut by De Vibe' } = await req.json();

    // Standardized Google Merchant / My Business apparel product feed listings for BahaMut by De Vibe
    const googleMerchantProducts = [
      {
        id: 'gm-001',
        slug: 'bahamut-draconic-heavyweight-tee',
        title: 'Bahamut Draconic Heavyweight Tee (Class 25)',
        category: 'TEE',
        description: 'Google Merchant Verified Listing: 240 GSM French Terry Woven Cotton in Obsidian Black. Engineered with mythological gothic silhouettes and reinforced collar ribbing.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '240 GSM French Terry Cotton (Obsidian Black)',
        price: 2499,
        original_mrp: 3999,
        stock_quantity: 50,
        rating: 4.9,
        review_count: 240,
        express_delivery: 'FREE Express Shipping via Google Merchant Fulfillment',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        pattern: 'Draconic Gothic Print',
        fit: 'Alphabetical Heavyweight Fit',
        sleeve: 'Half Sleeve',
        color: 'Obsidian Black',
        gtin: '8901234501816',
        mpn: 'BM-2026-DRAC-01',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'gm-002',
        slug: 'blood-flame-oversized-hoodie',
        title: 'Blood Flame Oversized Hoodie (Class 25)',
        category: 'TEE',
        description: 'Google Merchant Verified Listing: 400 GSM Heavy Fleece Cotton featuring custom gothic ribbing, deep crimson embroidery, and heavy-gauge warmth.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '400 GSM Heavy Fleece Cotton',
        price: 4999,
        original_mrp: 7999,
        stock_quantity: 35,
        rating: 5.0,
        review_count: 310,
        express_delivery: 'FREE Express Shipping via Google Merchant Fulfillment',
        images: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        pattern: 'Blood Flame Crimson',
        fit: 'Alphabetical Oversized Fit',
        sleeve: 'Full Sleeve',
        color: 'Blood Crimson & Black',
        gtin: '8901234501817',
        mpn: 'BM-2026-HOOD-02',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'gm-003',
        slug: 'tactical-multi-pocket-cargo-trousers',
        title: 'Tactical Multi-Pocket Cargo Trousers (Class 25)',
        category: 'BOTTOMWEAR',
        description: 'Google Merchant Verified Listing: Ripstop Cotton Trousers featuring deep gunmetal utility hardware, pre-shrunk waist fit, and 6-pocket tactical construction. Numeric waist sizes 28 to 38.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: 'Ripstop Heavyweight Woven Cotton',
        price: 3899,
        original_mrp: 5999,
        stock_quantity: 40,
        rating: 4.9,
        review_count: 195,
        express_delivery: 'FREE Express Shipping via Google Merchant Fulfillment',
        images: [
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['28', '30', '32', '34', '36', '38'],
        pattern: 'Tactical Ripstop Solid',
        fit: 'Numeric Tactical Fit (28-38)',
        sleeve: 'N/A',
        color: 'Gunmetal Charcoal',
        gtin: '8901234501818',
        mpn: 'BM-2026-CARGO-03',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'gm-004',
        slug: 'ahmedabad-woven-chambray-navy',
        title: 'De Vibe Classic Chambray Shirt - Deep Navy',
        category: 'SHIRT',
        description: 'Google My Business Listed Item: Direct-from-manufacturer 100% Breathable Woven Cotton crafted in Ahmedabad.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
        price: 1299,
        original_mrp: 2499,
        stock_quantity: 45,
        rating: 4.8,
        review_count: 148,
        express_delivery: 'FREE Express Delivery by Tomorrow',
        images: [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['38', '40', '42', '44', '46'],
        pattern: 'Solid Woven',
        fit: 'Numeric Standard Fit (38-46)',
        sleeve: 'Full Sleeve',
        color: 'Navy Blue',
        gtin: '8901234501819',
        mpn: 'BM-2026-SHIRT-04',
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];

    return NextResponse.json({
      success: true,
      account: merchantEmail,
      brand: brandName,
      synced_count: googleMerchantProducts.length,
      products: googleMerchantProducts
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
