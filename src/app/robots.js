const baseUrl = "https://example.com";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard", "/dashboard/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}