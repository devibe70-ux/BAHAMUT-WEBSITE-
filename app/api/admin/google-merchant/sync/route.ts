import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { merchantEmail = 'bahamut.india@gmail.com', brandName = 'BahaMut by De Vibe' } = await req.json();

    // Standardized Google Merchant / My Business apparel product feed listings for BahaMut by De Vibe (bahamut.india@gmail.com)
    const googleMerchantProducts = [
      {
        id: 'gm-001',
        slug: 'bahamut-draconic-heavyweight-tee',
        title: 'Bahamut Draconic Heavyweight Tee (Class 25)',
        category: 'TEE',
        description: 'Google Merchant Verified Listing (bahamut.india@gmail.com): 240 GSM French Terry Woven Cotton in Obsidian Black. Engineered with mythological gothic silhouettes and reinforced collar ribbing.',
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
        description: 'Google Merchant Verified Listing (bahamut.india@gmail.com): 400 GSM Heavy Fleece Cotton featuring custom gothic ribbing, deep crimson embroidery, and heavy-gauge warmth.',
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
        description: 'Google Merchant Verified Listing (bahamut.india@gmail.com): Ripstop Cotton Trousers featuring deep gunmetal utility hardware, pre-shrunk waist fit, and 6-pocket tactical construction. Numeric waist sizes 28 to 38.',
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
        description: 'Google My Business Listed Item (bahamut.india@gmail.com): Direct-from-manufacturer 100% Breathable Woven Cotton crafted in Ambawadi, Ahmedabad.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
        price: 1299,
        original_mrp: 2499,
        stock_quantity: 45,
        rating: 4.8,
        review_count: 148,
        express_delivery: 'FREE Express Delivery by Tomorrow',
        images: [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
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
      },
      {
        id: 'gm-005',
        slug: 'cyber-street-graffiti-oversized-tee',
        title: 'BahaMut Kinetic Graphic Oversized Tee - Acid Black',
        category: 'TEE',
        description: 'Google Merchant Verified Listing (bahamut.india@gmail.com): Expressive kinetic print graphic tee featuring high-density reactive printing on premium 100% Woven Cotton canvas. Alphabetical sizes S, M, L, XL, XXL.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '100% Breathable Woven Cotton (220 GSM)',
        price: 1099,
        original_mrp: 2199,
        stock_quantity: 35,
        rating: 4.9,
        review_count: 210,
        express_delivery: 'FREE Express Delivery by Tomorrow',
        images: [
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        pattern: 'Graphic Kinetic Print',
        fit: 'Alphabetical Comfort Fit',
        sleeve: 'Half Sleeve',
        color: 'Acid Wash Black',
        gtin: '8901234501820',
        mpn: 'BM-2026-TEE-05',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'gm-006',
        slug: 'textured-oxford-solid-khaki',
        title: 'De Vibe Executive Oxford Cotton Shirt - Pure Khaki',
        category: 'SHIRT',
        description: 'Google My Business Verified Listing (bahamut.india@gmail.com): Refined weave with high thread density. Tailored for comfort across hot and humid climates. Features resin buttons and reinforced collar. Numeric shirt sizes 38 to 46.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '100% Breathable Woven Cotton',
        price: 1399,
        original_mrp: 2699,
        stock_quantity: 50,
        rating: 4.7,
        review_count: 124,
        express_delivery: 'FREE Express Delivery by Tomorrow',
        images: [
          'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['38', '40', '42', '44', '46'],
        pattern: 'Oxford Solid',
        fit: 'Numeric Structured Fit (38-46)',
        sleeve: 'Full Sleeve',
        color: 'Khaki Beige',
        gtin: '8901234501821',
        mpn: 'BM-2026-SHIRT-06',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'gm-007',
        slug: 'woven-cotton-trousers-chino-olive',
        title: 'De Vibe Ahmedabad Woven Cotton Chino Trousers - Olive Green',
        category: 'BOTTOMWEAR',
        description: 'Google Merchant Verified Listing (bahamut.india@gmail.com): Direct-from-mill 100% Woven Cotton Chino Trousers. Durable stretch waistband, deep utility pockets, and pre-shrunk finish. Numeric waist sizes 28 to 38.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '100% Woven Cotton Twill (Ahmedabad Mills)',
        price: 1599,
        original_mrp: 2999,
        stock_quantity: 40,
        rating: 4.9,
        review_count: 185,
        express_delivery: 'FREE Express Delivery by Tomorrow',
        images: [
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['28', '30', '32', '34', '36', '38'],
        pattern: 'Solid Chino',
        fit: 'Numeric Tailored Fit (28-38)',
        sleeve: 'N/A',
        color: 'Olive Green',
        gtin: '8901234501822',
        mpn: 'BM-2026-PANT-07',
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'gm-008',
        slug: 'woven-cotton-denim-jeans-indigo',
        title: 'De Vibe Raw Indigo Woven Denim Jeans - Classic Straight',
        category: 'BOTTOMWEAR',
        description: 'Google Merchant Verified Listing (bahamut.india@gmail.com): Heavyweight 100% Woven Cotton Raw Indigo Denim Jeans. Reinforced rivets, classic 5-pocket construction, and pre-shrunk waist fit. Numeric waist sizes 28 to 38.',
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '100% Heavyweight Woven Cotton Denim',
        price: 1799,
        original_mrp: 3499,
        stock_quantity: 30,
        rating: 4.9,
        review_count: 162,
        express_delivery: 'FREE Express Delivery by Tomorrow',
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['28', '30', '32', '34', '36', '38'],
        pattern: 'Raw Denim Solid',
        fit: 'Numeric Straight Fit (28-38)',
        sleeve: 'N/A',
        color: 'Indigo Blue',
        gtin: '8901234501823',
        mpn: 'BM-2026-JEAN-08',
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
