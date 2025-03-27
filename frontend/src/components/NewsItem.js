import React, { useState } from "react";
import NewsModal from "./NewsModal";

// Allowed Categories
const ALLOWED_CATEGORIES = ["sports", "technology", "politics", "health", "business"];

const NewsItem = ({ article }) => {
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Function to extract "Read More" link and clean description
  const processDescription = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.description, "text/html");

    const aTag = doc.querySelector("a");
    const readMoreLink = aTag ? aTag.href : "";
    if (aTag) aTag.remove();

    return {
      cleanedDescription: doc.body.innerHTML,
      readMoreLink,
    };
  };

  const { cleanedDescription, readMoreLink } = processDescription();

  let categoryRaw = article.category ? article.category.trim().toLowerCase() : "";
  let category = ALLOWED_CATEGORIES.find(label => categoryRaw.includes(label)) || "";

  // Ensure modal opens instantly
  const handleButtonClick = () => {
    setIsActive(true);
    setShowModal(true); // Immediately open modal

    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  return (
    <>
      <div className="news-item">
        <h3 className="news-title">{article.title}</h3>
        <img src={article.image} alt={article.title} className="news-image" />

        <p className="news-description" style={{ marginBottom: "-25px" }} 
           dangerouslySetInnerHTML={{ __html: cleanedDescription }}></p>

        {/* Read More Button with Active Click Effect */}
        <button
          className={`read-more-btn ${isActive ? "active-click" : ""}`}
          onClick={handleButtonClick}
        >
          Read More
        </button>

        <div className="news-footer">
          {category && (
            <span className={`news-category ${category}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          )}
          <span className="news-date">
            {new Date(article.pubDate).toLocaleString()}
          </span>
        </div>
      </div>

      {/* News Modal */}
      {showModal && (
        <NewsModal show={showModal} handleClose={() => setShowModal(false)} article={{ ...article, link: readMoreLink }} />
      )}
    </>
  );
};

export default NewsItem;
