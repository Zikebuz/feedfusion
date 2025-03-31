const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const { JSDOM } = require("jsdom"); // Used for parsing HTML

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
      let category = ALLOWED_CATEGORIES.find(label => categoryRaw.includes(label)) || "general"; // 🔄 Default to "general"

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

// Route: Fetch Open Graph metadata for a given news URL
router.get("/meta", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Use headers to mimic a real browser request
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      },
    });

    const dom = new JSDOM(response.data);
    const metaTags = dom.window.document.querySelectorAll("meta");

    let metaData = {
      title: "",
      description: "",
      image: "",
      url: url,
    };

    metaTags.forEach((tag) => {
      if (tag.getAttribute("property") === "og:title") {
        metaData.title = tag.getAttribute("content");
      } else if (tag.getAttribute("property") === "og:description") {
        metaData.description = tag.getAttribute("content");
      } else if (tag.getAttribute("property") === "og:image") {
        metaData.image = tag.getAttribute("content");
      }
    });

    // ✅ Append full FeedFusion share URL for correct previews
    metaData.url = `https://feedfusion.vercel.app/${req.query.category || "general"}/${encodeURIComponent(url)}`;

    res.json(metaData);
  } catch (error) {
    console.error("Error fetching Open Graph metadata:", error);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
});

module.exports = router;
