import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

const NewsProxy = () => {
  const [searchParams] = useSearchParams();
  const sourceUrl = searchParams.get("source");
  const title = searchParams.get("title") || "Read this news on FeedFusion";
  const image = searchParams.get("image") || "https://feedfusion.vercel.app/default-image.jpg";
  const description = searchParams.get("description") || "Stay updated with FeedFusion";

  useEffect(() => {
    if (sourceUrl) {
      setTimeout(() => {
        window.location.href = sourceUrl; // Redirect after meta tags are set
      }, 2000);
    }
  }, [sourceUrl]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={`https://feedfusion.vercel.app/news?source=${encodeURIComponent(sourceUrl)}`} />
      </Helmet>
      <p>Loading news...</p> {/* Optional message before redirect */}
    </>
  );
};

export default NewsProxy;
