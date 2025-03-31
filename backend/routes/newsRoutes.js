const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");

const router = express.Router();

// Allowed categories
const ALLOWED_CATEGORIES = ["sports", "technology", "politics", "health", "business"];
const RSS_FEEDS = {
  sports: "https://rss.punchng.com/v1/category/sports",
  technology: "https://rss.punchng.com/v1/category/technology",
  health: "https://rss.punchng.com/v1/category/health",
  politics: "https://rss.punchng.com/v1/category/politics",
  business: "https://rss.punchng.com/v1/category/business",
};

// Function to fetch and parse RSS feeds
const fetchRSS = async (url) => {
  try {
    const response = await axios.get(url);
    const result = await xml2js.parseStringPromise(response.data);

    return result.rss.channel[0].item.map((item) => {
      let categoryRaw = item.category?.[0]?.trim().toLowerCase() || "";
      let category = ALLOWED_CATEGORIES.find(label => categoryRaw.includes(label)) || "";

      return {
        title: item.title[0],
        link: item.link[0],
        pubDate: new Date(item.pubDate[0]).toISOString(),
        description: item.description[0],
        image: item.enclosure?.[0]?.$.url || "",
        category,
      };
    });
  } catch (error) {
    console.error(`Error fetching RSS from ${url}:`, error);
    return [];
  }
};

// Route: Fetch latest 8 articles per category
router.get("/home", async (req, res) => {
  try {
    let homeNews = [];

    for (const [category, url] of Object.entries(RSS_FEEDS)) {
      const newsItems = await fetchRSS(url);
      const top8 = newsItems.slice(0, 8);
      homeNews.push(...top8);
    }

    homeNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    res.json(homeNews);
  } catch (error) {
    console.error("Error fetching home news:", error);
    res.status(500).json({ error: "Failed to fetch home news" });
  }
});

// Route: Fetch 20 articles for a specific category
router.get("/:category", async (req, res) => {
  const category = req.params.category.toLowerCase();

  if (!RSS_FEEDS[category]) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    const newsItems = await fetchRSS(RSS_FEEDS[category]);
    const top20 = newsItems.slice(0, 20);
    res.json(top20);
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    res.status(500).json({ error: `Failed to fetch ${category} news` });
  }
});

// Route: Serve dynamic OG metadata for Facebook sharing
router.get("/article", (req, res) => {
  const { title, link, description, image } = req.query;

  if (!title || !link) {
    return res.status(400).send("Missing required parameters");
  }

  // Generate an HTML page with the correct Open Graph metadata
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="${title}" />
      <meta property="og:url" content="${link}" />
      <meta property="og:description" content="${description ? description.slice(0, 150) : ''}" />
      <meta property="og:image" content="${image || 'https://feedfusion.vercel.app/default-image.jpg'}" />
      <meta property="og:type" content="article" />
      <title>${title}</title>
      <meta http-equiv="refresh" content="0; url=${link}" />
    </head>
    <body>
      <p>Redirecting to <a href="${link}">${link}</a>...</p>
    </body>
    </html>
  `;

  res.send(html);
});


module.exports = router;
