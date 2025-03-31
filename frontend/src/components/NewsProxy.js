export default function handler(req, res) {
    const { source, title, image, description } = req.query;
  
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:type" content="article">
        <meta property="og:title" content="${title || "FeedFusion News"}">
        <meta property="og:description" content="${description || "Read the latest news on FeedFusion"}">
        <meta property="og:image" content="${image || "https://feedfusion.vercel.app/default-image.jpg"}">
        <meta property="og:url" content="https://feedfusion.vercel.app/news?source=${encodeURIComponent(source)}">
        <meta http-equiv="refresh" content="2;url=${source}">
        <title>${title || "Redirecting..."}</title>
      </head>
      <body>
        <p>Loading news...</p>
      </body>
      </html>
    `);
  }
  