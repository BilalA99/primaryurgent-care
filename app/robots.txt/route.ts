export function GET() {
  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Allow: /blog',
      'Allow: /blog/*',
      'Disallow: /thank-you',
      'Disallow: /admin',
      'Disallow: /cms',
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
      '',
      'Sitemap: https://primaryuc.com/sitemap-index.xml',
      'Sitemap: https://primaryuc.com/sitemap.xml',
      'Sitemap: https://primaryuc.com/sitemap-blog.xml',
    ].join('\n'),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
} 