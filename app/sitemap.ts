import type { MetadataRoute } from "next";
import { brands } from "@/lib/brands";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://next-dining.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/brands`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/happenings`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${baseUrl}/brands/${brand.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Japanese language pages
  const jaStaticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ja`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ja/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/ja/brands`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const jaBrandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${baseUrl}/ja/brands/${brand.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...brandPages, ...jaStaticPages, ...jaBrandPages];
}
