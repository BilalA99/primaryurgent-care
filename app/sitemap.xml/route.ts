import { LocationsScreens } from '@/components/locationsscreens';
import { pricingData } from '@/app/pricing/page';
import { conditions } from '@/components/conditions';
import { services } from '@/components/Services';
import { primaryCareServices } from '@/app/primary-care-doctor/page';

const BASE_URL = 'https://primaryuc.com';

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

  // Dynamic routes
  const locationRoutes: string[] = LocationsScreens.map(loc => `/locations/${loc.slug}`);
  const pricingRoutes: string[] = pricingData.map(item => `/pricing/${item.slug}`);
  const urgentInjuryCareRoutes: string[] = conditions.map(item => `/urgent-injury-care/${item.slug}`);
  // Remove serviceRoutes, add emergencyRoomServiceRoutes
  const emergencyRoomServiceRoutes: string[] = services.map(item => `/emergency-room/${item.slug}`);
  // Add dynamic routes for primary-care-doctor/[slug]
  const primaryCareDoctorRoutes: string[] = primaryCareServices.map((item: { slug: string }) => `/primary-care-doctor/${item.slug}`);
  // Add individual service pages
  const individualServiceRoutes: string[] = [
    '/service/ct-scan',
    '/service/nuclear-scans',
    '/service/dot-physical'
  ];
  
  // Blog post routes will be added when Supabase integration is complete
  const blogPostRoutes: string[] = [];
  
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
    ...blogPostRoutes,
    ...accidentRoutes,
  ];

  const urls = allRoutes.map(
    path => {
      const priority = accidentRoutes.includes(path) ? '0.9' : '0.8';
      return `\n    <url>\n      <loc>${BASE_URL}${path}</loc>\n      <changefreq>weekly</changefreq>\n      <priority>${priority}</priority>\n    </url>`;
    }
  ).join('');

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
