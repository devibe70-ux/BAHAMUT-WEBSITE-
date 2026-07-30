import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { titleHint, demographic, pattern, color, targetPrice } = body;

    const baseTitle = titleHint || 'Pure Woven Cotton Shirt';
    const isYouth = demographic === 'YOUTH';

    const generatedTitle = isYouth
      ? `BahaMut Youth ${baseTitle} - ${color || 'Urban Vibe'}`
      : `De Vibe Classic ${baseTitle} - ${color || 'Structured Solid'}`;

    const slug = generatedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const generatedDescription = isYouth
      ? 'High-energy urban streetwear statement crafted from 100% Breathable Woven Cotton ' +
        'from Ahmedabad textile mills. Pre-shrunk for effortless oversized drape, ' +
        'maximum air permeability, and zero shrinkage.'
      : 'Executive structured woven solid tailored from 100% Breathable Woven Cotton. ' +
        'Crafted in Ahmedabad with high thread count, reinforced collar stay, and superior ' +
        'sweat-wicking comfort for daily formal or semi-formal wear.';

    const generatedFabricDetails = '100% Breathable Woven Cotton (Ahmedabad Mills)';
    const price = targetPrice ? Number(targetPrice) : (isYouth ? 1299 : 1399);
    const originalMrp = Math.round(price * 1.9);

    const generatedImages = isYouth
      ? [
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
        ]
      : [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
        ];

    return NextResponse.json({
      success: true,
      product: {
        id: `prod-${Date.now()}`,
        slug,
        title: generatedTitle,
        description: generatedDescription,
        target_demographic: demographic || 'CLASSIC',
        fabric_details: generatedFabricDetails,
        price,
        original_mrp: originalMrp,
        stock_quantity: 50,
        images: generatedImages,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        pattern: pattern || (isYouth ? 'Street Graphic' : 'Solid Woven'),
        color: color || 'Navy Blue',
        is_active: true,
        created_at: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI product generation failed' }, { status: 500 });
  }
}
