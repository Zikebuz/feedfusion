export const fetchRSS = async () => {
    try {
      console.log("Fetching news from backend..."); // Debugging
      const response = await fetch("http://localhost:5050/api/news");
      const data = await response.json();
      console.log("News Data Received:", data); // Debugging
      return data;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };
  