// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
var site = "https://primaryuc.com";
var Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    slug: { type: "string", required: true },
    title: { type: "string", required: false, description: "e.g., MD, DO, PA-C" },
    bio: { type: "string", required: false },
    avatar: { type: "string", required: false },
    credentials: { type: "string", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (a) => `${site}/author/${a.slug}`
    }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    // SEO controls
    metaTitle: { type: "string", required: false },
    metaDescription: { type: "string", required: false },
    keywords: { type: "list", of: { type: "string" }, required: false },
    canonical: { type: "string", required: false },
    // Content metadata
    datePublished: { type: "date", required: true },
    dateModified: { type: "date", required: false },
    tags: { type: "list", of: { type: "string" }, required: true },
    author: { type: "string", required: false, description: "author slug (matches Author.slug)" },
    thumbnail: { type: "string", required: true },
    ogImage: { type: "string", required: false },
    featured: { type: "boolean", required: false, default: false },
    readingMinutes: { type: "number", required: false },
    locationFocus: { type: "list", of: { type: "string" }, required: false },
    faq: {
      type: "list",
      of: { type: "json" },
      // { q: string, a: string }
      required: false
    },
    summary: { type: "string", required: false }
    // used as card excerpt and metaDescription fallback
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (p) => `${site}/blog/${p.slug}`
    },
    og: {
      type: "string",
      resolve: (p) => p.ogImage ?? p.thumbnail
    },
    // safe default if not provided
    readingMins: {
      type: "number",
      resolve: (p) => {
        const txt = p.body?.raw ?? "";
        const est = readingTime(txt).minutes;
        const rounded = Math.max(1, Math.round(est));
        return p.readingMinutes ?? rounded;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Author],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }]
    ]
  }
});
export {
  Author,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-Z7I465EC.mjs.map
