export function GET() {
  return new Response(
    "User-agent: *\nAllow: /\nSitemap: https://primaryurgentcare.com/sitemap.xml",
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
} 