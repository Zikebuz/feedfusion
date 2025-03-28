import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";

const Sports = ({ searchQuery }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5050/api/news/sports") // ✅ Fetch sports news
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setFilteredNews(data); // ✅ Initially show all news
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sports news:", error);
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
    <div className="sports-container">
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

export default Sports;
