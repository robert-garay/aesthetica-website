import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/courses/",
          "/hours",
          "/skills",
          "/forums",
          "/messages",
          "/assessments",
          "/notifications",
          "/billing",
          "/api/",
          "/sign-in",
          "/sign-up",
        ],
      },
    ],
    sitemap: "https://aesthetica.app/sitemap.xml",
  }
}
