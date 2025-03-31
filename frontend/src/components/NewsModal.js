import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { fetchMetaData } from "../utils/fetchRSS";
import '../styles/style.css';

const NewsModal = ({ show, handleClose, article }) => {
  const [fullContent, setFullContent] = useState("Loading full news content...");
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
  });

  useEffect(() => {
    if (show && article?.link) {
      fetchFullArticle(article.link);
      fetchMetaDataDetails(article.link);
    }
  }, [show, article]);

  // Fetch Open Graph metadata for the article
  const fetchMetaDataDetails = async (newsUrl) => {
    const data = await fetchMetaData(newsUrl);
    if (data) {
      setMetaData({
        title: data.title || article?.title || "News Article",
        description: data.description || "",
        image: data.image || article?.image || "",
        url: data.url || article?.link || "",
      });
    }
  };

  // Fetch full article content
  const fetchFullArticle = async (articleUrl) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend URL is not set. Please configure REACT_APP_BACKEND_URL.");
      }

      const proxyUrl = `${backendUrl}/api/proxy?url=${encodeURIComponent(articleUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Failed to fetch article");

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

  // Construct shareable link
  // const shareUrl = `https://feedfusion.vercel.app/${article?.category || "general"}/${encodeURIComponent(article?.link.replace(/^https?:\/\//, ''))}`;

  const sanitizedUrl = article?.link.replace(/^https?:\/\//, '');
const shareUrl = `https://feedfusion.vercel.app/${article?.category || "general"}/${sanitizedUrl}`;

  
  console.log("Facebook Share URL:", shareUrl);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{metaData.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Article Image */}
        {metaData.image && (
          <div className="text-center">
            <img
              src={metaData.image}
              className="img-fluid mb-3"
              style={{ borderRadius: "10px" }}
              alt="News"
            />
          </div>
        )}

        {/* Full News Content */}
        <div dangerouslySetInnerHTML={{ __html: fullContent }}></div>

        {/* Social Media Share Buttons */}
        <div className="news-social-media mt-3 d-flex gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary"
          >
            Share on Facebook
          </a>

          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(metaData.title)}`}
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
