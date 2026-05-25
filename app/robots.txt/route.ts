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
      '',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      'User-agent: GPTBot',
      'Allow: /',
      '',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
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