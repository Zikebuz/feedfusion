require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "backend")));

// Import routes
const newsRoutes = require("./routes/newsRoutes");
const proxyRoutes = require("./routes/proxyRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Use routes
app.use("/api/news", newsRoutes);
app.use("/api/proxy", proxyRoutes);
app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

