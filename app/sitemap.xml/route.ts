import { LocationsScreens } from '@/components/locationsscreens';
import { pricingData } from '@/app/pricing/page';
import { conditions } from '@/components/conditions';
import { services } from '@/components/Services';
import { primaryCareServices } from '@/app/primary-care-doctor/page';

const BASE_URL = 'https://primaryuc.com';

// ISR: regenerate every hour — no Supabase dependency in main sitemap
export const revalidate = 3600

export async function GET() {
  // Static routes
  const staticRoutes: string[] = [
    '',
    '/appointment',
    '/blog',
    '/emergency-room',
    '/lawyers',
    '/locations',
    '/pain-management-care',
    '/pricing',
    '/service',
    '/urgent-injury-care',
    '/primary-care-doctor',
  ];

  // Dynamic routes (all static data — no Supabase)
  const locationRoutes: string[] = LocationsScreens.map(loc => `/locations/${loc.slug}`);
  const pricingRoutes: string[] = pricingData.map(item => `/pricing/${item.slug}`);
  const urgentInjuryCareRoutes: string[] = conditions.map(item => `/urgent-injury-care/${item.slug}`);
  const emergencyRoomServiceRoutes: string[] = services.map(item => `/emergency-room/${item.slug}`);
  const primaryCareDoctorRoutes: string[] = primaryCareServices.map((item: { slug: string }) => `/primary-care-doctor/${item.slug}`);
  const individualServiceRoutes: string[] = [
    '/service/ct-scan',
    '/service/nuclear-scans',
    '/service/dot-physical'
  ];
  
  // Blog posts are in sitemap-blog.xml only — removed from here to prevent duplication
  
  // Car accident routes
  const accidentRoutes: string[] = [
    '/car-accident-injury-clinic',
    '/car-accident/royal-palm-beach',
    '/car-accident/lake-worth',
    '/car-accident/palm-springs',
    '/car-accident/lantana',
    '/car-accident/whiplash',
    '/car-accident/back-neck-pain',
    '/car-accident/documentation-pip',
    '/car-accident/urgent-care-vs-er'
  ];

  const allRoutes: string[] = [
    ...staticRoutes,
    ...locationRoutes,
    ...pricingRoutes,
    ...urgentInjuryCareRoutes,
    ...emergencyRoomServiceRoutes,
    ...primaryCareDoctorRoutes,
    ...individualServiceRoutes,
    ...accidentRoutes,
  ];

  const lastmod = new Date().toISOString().split('T')[0];
  const urls = allRoutes.map(
    path => {
      const priority = accidentRoutes.includes(path) ? '0.9' : '0.8';
      return `\n    <url>\n      <loc>${BASE_URL}${path}</loc>\n      <lastmod>${lastmod}</lastmod>\n      <changefreq>weekly</changefreq>\n      <priority>${priority}</priority>\n    </url>`;
    }
  ).join('');

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      // Keep CDN caching short so new posts appear without redeploy
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
