module.exports = {
    siteUrl: "https://example.com",
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ["/dashboard", "/dashboard/*", "/result/*", "/opengraph-image.png"],

    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/dashboard", "/dashboard/"],
            },
        ],
    },
};

