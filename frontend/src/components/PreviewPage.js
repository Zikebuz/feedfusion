import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PreviewPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const actualUrl = queryParams.get("url");

  useEffect(() => {
    if (actualUrl) {
      window.location.href = decodeURIComponent(actualUrl); // Redirect to actual article
    }
  }, [actualUrl]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Redirecting to the full article...</h2>
      <p>If you are not redirected, <a href={actualUrl}>click here</a>.</p>
    </div>
  );
};

export default PreviewPage;
