import type { MetadataRoute } from "next";
import { siteData } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${siteData.domain}/sitemap.xml`,
  };
}
