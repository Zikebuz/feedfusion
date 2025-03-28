export const fetchRSS = async () => {
  try {
    const backendUrl = process.env.APP_BACKEND_URL; // ✅ Load backend URL dynamically
    console.log("Fetching news from backend..."); // Debugging

    const response = await fetch(`${backendUrl}/api/news`);
    const data = await response.json();

    console.log("News Data Received:", data); // Debugging
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
