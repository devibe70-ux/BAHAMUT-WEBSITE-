import { MetadataRoute } from 'next';
import { INITIAL_PRODUCTS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bahamut.in';

  const productUrls = INITIAL_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${encodeURIComponent(product.slug)}`,
    lastModified: new Date(product.created_at || Date.now()),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const staticPages = [
    '',
    '/catalog',
    '/cart',
    '/checkout',
    '/terms-and-conditions',
    '/privacy-policy',
    '/refund-policy',
    '/shipping-policy',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticPages, ...productUrls];
}
