import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PreviewPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const articleUrl = queryParams.get("url");

  const [articleTitle, setArticleTitle] = useState("Loading...");
  const [articleLink, setArticleLink] = useState(articleUrl);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("Backend URL is not set. Please configure REACT_APP_BACKEND_URL.");
        }

        const response = await fetch(`${backendUrl}/api/get-article-metadata?url=${encodeURIComponent(articleUrl)}`);
        if (!response.ok) throw new Error("Failed to fetch article metadata");

        const data = await response.json();
        setArticleTitle(data.title || "Article");
        setArticleLink(data.link || articleUrl);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };

    if (articleUrl) {
      fetchMetadata();
      setTimeout(() => {
        window.location.href = decodeURIComponent(articleUrl);
      }, 3000); // Redirect after fetching metadata
    }
  }, [articleUrl]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{articleTitle}</h2>
      <p>Redirecting to the full article...</p>
      <p>If not redirected, <a href={articleLink}>click here</a>.</p>
    </div>
  );
};

export default PreviewPage;
