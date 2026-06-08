import type { MetadataRoute } from "next";
import { siteData } from "@/data/site";
import { sampleOpportunities } from "@/data/opportunities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${siteData.domain}`;
  const routes = ["", "/sell", "/opportunities", "/buyers", "/partners", "/about", "/faq", "/contact"];

  const staticPages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/opportunities" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // TODO(step 8): build from Supabase opportunities instead of the sample array.
  const oppPages: MetadataRoute.Sitemap = sampleOpportunities.map((o) => ({
    url: `${base}/opportunities/${o.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...oppPages];
}
