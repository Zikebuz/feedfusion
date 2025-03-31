import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const NewsProxy = () => {
  const [searchParams] = useSearchParams();
  const sourceUrl = searchParams.get("source");

  useEffect(() => {
    if (sourceUrl) {
      window.location.href = sourceUrl; // Redirect to original source
    }
  }, [sourceUrl]);

  return <p>Loading news...</p>; // Optional loading message before redirect
};

export default NewsProxy;
