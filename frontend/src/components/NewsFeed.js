import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { fetchRSS } from "../utils/fetchRSS"; // ✅ Import centralized fetch function

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await fetchRSS();
      console.log("Fetched News:", data); // Debugging
      setNews(data.sports || []); // ✅ Assuming we want sports news first
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-feed">
      <h1>Latest News</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : news.length > 0 ? (
        news.map((article, index) => <NewsItem key={index} article={article} />)
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default NewsFeed;
