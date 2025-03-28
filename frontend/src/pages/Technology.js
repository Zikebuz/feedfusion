import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";

const appbackendUrl = process.env.APP_BACKEND_URL; // ✅ Load from .env

const Technology = ({ searchQuery }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${appbackendUrl}/api/news/technology`) // ✅ Fetch technology news dynamically
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setFilteredNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching technology news:", error);
        setLoading(false);
      });
  }, []);

  // Filter news based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  }, [searchQuery, news]);

  return (
    <div className="technology-container">
      {loading ? (
        <p style={{ textAlign: "center", margin: "10% auto" }}>Loading...</p>
      ) : (
        <div className="grid-view">
          {filteredNews.length > 0 ? (
            filteredNews.map((article, index) => (
              <NewsItem key={index} article={article} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
              No results found in this category.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Technology;
