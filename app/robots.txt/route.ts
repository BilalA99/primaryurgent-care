export function GET() {
  return new Response(
    [
      'User-agent: *',
      'Disallow: /thank-you',
      'Disallow: /admin',
      'Disallow: /*.js$',
      'Disallow: /*.mjs$',
      'Disallow: /*.ts$',
      'Disallow: /*.tsx$',
      'Disallow: /*.jsx$',
      'Disallow: /*.png$',
      'Disallow: /*.jpg$',
      'Disallow: /*.jpeg$',
      'Disallow: /*.gif$',
      'Disallow: /*.svg$',
      'Disallow: /*.webp$',
      'Disallow: /*.ico$',
      'Allow: /',
      '',
      'Sitemap: https://primaryuc.com/sitemap.xml',
    ].join('\n'),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
} 