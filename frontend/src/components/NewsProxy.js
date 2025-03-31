import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

const NewsProxy = () => {
  const [searchParams] = useSearchParams();
  const sourceUrl = searchParams.get("source");
  const title = searchParams.get("title") || "Read this news on FeedFusion";
  const image = searchParams.get("image") || "https://feedfusion.vercel.app/default-image.jpg";
  const description = searchParams.get("description") || "Stay updated with FeedFusion";

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Delay redirect to allow Facebook to read meta tags
    const timer = setTimeout(() => setRedirect(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={`https://feedfusion.vercel.app/news?source=${encodeURIComponent(sourceUrl)}`} />
      </Helmet>
      {!redirect ? <p style={{ textAlign: "center", margin: "10% auto" }}>Loading news...</p> : (window.location.href = sourceUrl)}
    </>
  );
};

export default NewsProxy;
