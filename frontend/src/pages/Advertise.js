import React from "react";
import { Link } from "react-router-dom"; // Ensure routing is set up

const Advertise = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Advertise With Us</h1>
      <p>
        Welcome to <strong>Feedfusion</strong>, your go-to platform for the latest and most relevant news. Our rapidly growing audience stays updated on
        politics, business, technology, sports, and health, making it the perfect place to showcase your brand.
      </p>
      <p>
        We offer a variety of advertising options, including banner ads, sponsored content, and native ads that seamlessly blend into the reading experience.
        Get your brand in front of an engaged and informed audience today.
      </p>
      <p>
        📩 <strong>Interested in advertising with us?</strong>{" "}
        <Link to="/contactus" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
          Contact our team
        </Link>{" "}
        for pricing and placement options.
      </p>
    </div>
  );
};

export default Advertise;
