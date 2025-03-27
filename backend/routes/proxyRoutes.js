const express = require("express");
const axios = require("axios");

const router = express.Router();

// Route: Fetch full article via proxy (CORS bypass)
router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    res.send(response.data);
  } catch (error) {
    console.error("Error fetching full article:", error);
    res.status(500).json({ error: "Failed to fetch full article" });
  }
});

module.exports = router;
