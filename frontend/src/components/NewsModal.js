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
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
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

      let paragraphs = Array.from(doc.querySelectorAll("p")).slice(3);
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

      if (paragraphs.length > 0 && paragraphs[paragraphs.length - 1].textContent.trim() === "") {
        paragraphs.pop();
      }

      if (paragraphs.length > 0) {
        paragraphs.pop();
      }

      const filteredContent =
        paragraphs.map((p) => `<p>${p.innerHTML}</p>`).join("") || "<p>Content not available.</p>";

      setFullContent(filteredContent);
    } catch (error) {
      console.error("Error fetching full news content:", error);
      setFullContent("<p>Failed to load news content.</p>");
    }
  };

  // Construct correct shareable link
  const articlePath = article?.link.replace(/^https?:\/\//, ''); 
  const baseShareUrl = `https://feedfusion.vercel.app/${articlePath}`;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{article?.title || "News Article"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

        <div dangerouslySetInnerHTML={{ __html: fullContent }}></div>

        <div className="news-social-media mt-3">
          {/* Facebook Share */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseShareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary me-2"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseShareUrl)}`,
                "_blank",
                "height=430,width=640"
              );
            }}
          >
            Share on Facebook
          </a>

          {/* Twitter Share */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(baseShareUrl)}&text=${encodeURIComponent(article?.title || "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info"
          >
            Share on Twitter
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewsModal;
