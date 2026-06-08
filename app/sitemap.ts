import type { MetadataRoute } from "next";
import { siteData } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${siteData.domain}`;
  const routes = ["", "/sell", "/buyers", "/partners", "/about", "/faq", "/contact"];

  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
