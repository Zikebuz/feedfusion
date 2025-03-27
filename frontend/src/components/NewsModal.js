// import React, { useEffect, useState } from "react";
// import { Modal } from "react-bootstrap";

// const NewsModal = ({ show, handleClose, article }) => {
//   const [fullContent, setFullContent] = useState("Loading full news content...");

//   useEffect(() => {
//     if (show && article?.link) {
//       fetchFullArticle(article.link);
//     }
//   }, [show, article]);

//   const fetchFullArticle = async (articleUrl) => {
//     try {
//       const proxyUrl = `http://localhost:5000/api/proxy?url=${encodeURIComponent(articleUrl)}`;
//       const response = await fetch(proxyUrl);

//       if (!response.ok) {
//         throw new Error("Failed to fetch article");
//       }

//       const text = await response.text();
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(text, "text/html");

//       // Extract all <p> tags for full article content
//       let paragraphs = Array.from(doc.querySelectorAll("p")).slice(3);

//       // Unwanted phrases to remove
//       const unwantedPhrases = [
//         "All rights reserved.",
//         "may not be reproduced, published, broadcast, rewritten or redistributed",
//         "Contact:",
//         "Follow The Punch Newspaper on WhatsApp",
//         "URGENT UPDATE:",
//         "earn in US Dollars with domain flipping",
//         "punchng.com ©",
//         "Kindly share this story:",
//       ];

//       paragraphs = paragraphs.filter(
//         (p) => !unwantedPhrases.some((phrase) => p.textContent.includes(phrase))
//       );

//       // Remove last <p> if it's empty
//       if (paragraphs.length > 0 && paragraphs[paragraphs.length - 1].textContent.trim() === "") {
//         paragraphs.pop();
//       }

//       // **Remove the last paragraph from the article**
//       if (paragraphs.length > 0) {
//         paragraphs.pop();
//       }

//       // Join filtered content into HTML
//       const filteredContent =
//         paragraphs.map((p) => `<p>${p.innerHTML}</p>`).join("") || "<p>Content not available.</p>";

//       setFullContent(filteredContent);
//     } catch (error) {
//       console.error("Error fetching full news content:", error);
//       setFullContent("<p>Failed to load news content.</p>");
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>{article?.title || "News Article"}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {/* Article Image */}
//         {article?.image && (
//           <div className="text-center">
//             <img
//               src={article.image}
//               className="img-fluid mb-3"
//               style={{ borderRadius: "10px" }}
//               alt="News"
//             />
//           </div>
//         )}

//         {/* Full News Content */}
//         <div dangerouslySetInnerHTML={{ __html: fullContent }}></div>

//              {/* Social Media Share Buttons */}
//              <div className="news-social-media mt-3">
//           <a
//             href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(article?.link || "")}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="btn btn-outline-primary me-2"
//           >
//             Share on Facebook
//           </a>
//           <a
//             href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(article?.link || "")}&text=${encodeURIComponent(article?.title || "")}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="btn btn-outline-info"
//           >
//             Share on Twitter
//           </a>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default NewsModal;


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
      const proxyUrl = `http://localhost:5000/api/proxy?url=${encodeURIComponent(articleUrl)}`;
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

  // Construct shareable link
  const baseShareUrl = `http://localhost:3000/${article?.category || "general"}/${article?.link}`;

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
        <div className="news-social-media mt-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseShareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary me-2"
          >
            Share on Facebook
          </a>
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
