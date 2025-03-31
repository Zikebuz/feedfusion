export const fetchRSS = async () => {
  try {
    console.log("Fetching news from backend..."); // Debugging
    const response = await fetch("https://feedfusion-6j74.onrender.com/api/news");
    const data = await response.json();
    console.log("News Data Received:", data); // Debugging
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// Function to fetch Open Graph metadata for a given news URL
export const fetchMetaData = async (newsUrl) => {
  if (!newsUrl) return null;

  try {
    console.log(`Fetching metadata for: ${newsUrl}`); // Debugging
    const response = await fetch(`https://feedfusion-6j74.onrender.com/api/news/meta?url=${encodeURIComponent(newsUrl)}`);
    const data = await response.json();
    console.log("Metadata Received:", data); // Debugging
    return data;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
};
