import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sports from "./pages/Sports";
import Technology from "./pages/Technology";
import Business from "./pages/Business";
import Health from "./pages/Health";
import Politics from "./pages/Politics";
import Contactus from "./pages/Contactus";
import Advertise from "./pages/Advertise";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import "bootstrap/dist/css/bootstrap.min.css";


console.log("Navbar:", Navbar);
console.log("Footer:", Footer);
console.log("Home:", Home);
console.log("Sports:", Sports);
console.log("Technology:", Technology);
console.log("Business:", Business);
console.log("Health:", Health);
console.log("Politics:", Politics);
console.log("Contactus:", Contactus);
console.log("Advertise:", Advertise);
console.log("PrivacyPolicy:", PrivacyPolicy);



const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to pass search query to pages
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/sports" element={<Sports searchQuery={searchQuery} />} />
        <Route path="/technology" element={<Technology searchQuery={searchQuery} />} />
        <Route path="/business" element={<Business searchQuery={searchQuery} />} />
        <Route path="/health" element={<Health searchQuery={searchQuery} />} />
        <Route path="/politics" element={<Politics searchQuery={searchQuery} />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
