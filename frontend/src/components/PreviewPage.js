import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const PreviewPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const articleUrl = queryParams.get("url");

  const [articleTitle, setArticleTitle] = useState("Loading...");
  const [articleImage, setArticleImage] = useState(""); // Default image placeholder
  const [articleDescription, setArticleDescription] = useState("Redirecting to the full article...");
  
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
        setArticleTitle(data.title || "News Article");
        setArticleImage(data.image || "https://feedfusion.vercel.app/default-image.jpg");
        setArticleDescription(data.description || "Check out this article on FeedFusion!");
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };

    if (articleUrl) {
      fetchMetadata();
      setTimeout(() => {
        window.location.href = decodeURIComponent(articleUrl);
      }, 3000); // Redirect after 3 seconds
    }
  }, [articleUrl]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* ✅ Meta Tags for Facebook */}
      <Helmet>
        <title>{articleTitle}</title>
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content={articleDescription} />
        <meta property="og:image" content={articleImage} />
        <meta property="og:url" content={`https://feedfusion.vercel.app/preview?url=${encodeURIComponent(articleUrl)}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <h2>{articleTitle}</h2>
      <p>Redirecting to the full article...</p>
      <p>If not redirected, <a href={articleUrl}>click here</a>.</p>
    </div>
  );
};

export default PreviewPage;
