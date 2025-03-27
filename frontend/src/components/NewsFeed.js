import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched News:", data); // Debugging
        setNews(data.sports || []); // Assuming we want sports news first
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="news-feed">
      <h1>Latest News</h1>
      {news.length > 0 ? (
        news.map((article, index) => <NewsItem key={index} article={article} />)
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default NewsFeed;
