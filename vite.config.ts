import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { brand, seo, structuredData } from "./src/content.ts";

function htmlAttribute(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

const contentMetadata = {
  name: "infinitylab-content-metadata",
  transformIndexHtml(html: string) {
    const headTags = [
      `<title>${seo.title}</title>`,
      `<meta name="description" content="${htmlAttribute(seo.description)}" />`,
      `<meta name="theme-color" content="${seo.themeColor}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:locale" content="pt_BR" />`,
      `<meta property="og:site_name" content="${htmlAttribute(brand.name)}" />`,
      `<meta property="og:title" content="${htmlAttribute(seo.title)}" />`,
      `<meta property="og:description" content="${htmlAttribute(seo.description)}" />`,
      `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>`,
    ].join("\n    ");

    return html.replace("</head>", `    ${headTags}\n  </head>`);
  },
};

let rootCanecaPhoto = "";
const includeRootCanecaPhoto: Plugin = {
  name: "infinitylab-root-caneca-photo",
  apply: "build",
  configResolved(config) {
    rootCanecaPhoto = resolve(config.root, "image", "caneca-bota.jpg");
  },
  generateBundle() {
    if (!rootCanecaPhoto || !existsSync(rootCanecaPhoto)) return;
    this.emitFile({
      type: "asset",
      fileName: "image/caneca-bota.jpg",
      source: readFileSync(rootCanecaPhoto),
    });
  },
};

export default defineConfig({
  base: "/infinitylab.3d/",
  plugins: [react(), contentMetadata, includeRootCanecaPhoto],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
