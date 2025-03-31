import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import '../styles/style.css';

const NewsModal = ({ show, handleClose, article }) => {
  const [fullContent, setFullContent] = useState("Loading full news content...");

  useEffect(() => {
    if (show && article?.link) {
      fetchFullArticle(article.link);
    }
  }, [show, article]);

  const fetchFullArticle = async (articleUrl) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL; // ✅ Only dynamic backend URL, no default
      if (!backendUrl) {
        throw new Error("Backend URL is not set. Please configure REACT_APP_BACKEND_URL.");
      }

      const proxyUrl = `${backendUrl}/api/proxy?url=${encodeURIComponent(articleUrl)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // Extract all <p> tags for full article content
      let paragraphs = Array.from(doc.querySelectorAll("p")).slice(3);

      // Unwanted phrases to remove
      const unwantedPhrases = [
        "All rights reserved.",
        "may not be reproduced, published, broadcast, rewritten or redistributed",
        "Contact:",
        "Follow The Punch Newspaper on WhatsApp",
        "URGENT UPDATE:",
        "earn in US Dollars with domain flipping",
        "punchng.com ©",
        "Kindly share this story:",
        "AFP",
      ];

      paragraphs = paragraphs.filter(
        (p) => !unwantedPhrases.some((phrase) => p.textContent.includes(phrase))
      );

      // Remove last <p> if it's empty
      if (paragraphs.length > 0 && paragraphs[paragraphs.length - 1].textContent.trim() === "") {
        paragraphs.pop();
      }

      // **Remove the last paragraph from the article**
      if (paragraphs.length > 0) {
        paragraphs.pop();
      }

      // Join filtered content into HTML
      const filteredContent =
        paragraphs.map((p) => `<p>${p.innerHTML}</p>`).join("") || "<p>Content not available.</p>";

      setFullContent(filteredContent);
    } catch (error) {
      console.error("Error fetching full news content:", error);
      setFullContent("<p>Failed to load news content.</p>");
    }
  };

  // Construct shareable link in the correct format
  // const baseShareUrl = `https://feedfusion.vercel.app/${article?.category || "general"}/${article?.link.replace(/^https?:\/\//, '')}`;

  // Use the original article link directly
  // const baseShareUrl = encodeURIComponent(article?.link || "");
  // const tweetText = encodeURIComponent(article?.title || "Check this out!");
  // const hashtags = encodeURIComponent(article?.category ? `${article.category}` : "");

  const previewUrl = `https://feedfusion.vercel.app/preview?url=${encodeURIComponent(article?.link)}`;
  const baseShareUrl = `https://feedfusion.vercel.app/article?url=${encodeURIComponent(article?.link || "")}`;
  const tweetText = encodeURIComponent(article?.title || "Check this out!");
  const hashtags = encodeURIComponent(article?.category ? `#${article.category}` : "");



  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{article?.title || "News Article"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Article Image */}
        {article?.image && (
          <div className="text-center">
            <img
              src={article.image}
              className="img-fluid mb-3"
              style={{ borderRadius: "10px" }}
              alt="News"
            />
          </div>
        )}

        {/* Full News Content */}
        <div dangerouslySetInnerHTML={{ __html: fullContent }}></div>

        {/* Social Media Share Buttons */}
        {/* <div className="news-social-media mt-3 d-flex gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${baseShareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary"
          >
            Share on Facebook
          </a>

          <a
            href={`https://x.com/intent/tweet?url=${baseShareUrl}&text=${tweetText}&hashtags=${hashtags}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info"
          >
            Share on X (Twitter)
          </a>
        </div> */}


        {/* Social Media Share Buttons */}
        <div className="news-social-media mt-3 d-flex gap-2">
          {/* <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseShareUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-outline-primary"
  >
    Share on Facebook
  </a> */}

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(previewUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary"
          >
            Share on Facebook
          </a>

          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(baseShareUrl)}&text=${tweetText}&hashtags=${hashtags}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info"
          >
            Share on X (Twitter)
          </a>
        </div>


      </Modal.Body>
    </Modal>
  );
};

export default NewsModal;
