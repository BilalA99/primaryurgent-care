export function GET() {
  return new Response(
    "User-agent: *\nAllow: /\nSitemap: https://primaryuc.com/sitemap.xml",
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
} 