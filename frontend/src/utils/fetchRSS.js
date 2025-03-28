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
  