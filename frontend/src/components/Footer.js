import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/style.css'; // Ensure the CSS is correctly linked

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-3 mb-3">
            <h5>About Us</h5>
            <p>
              Feedsfusion is a Nigerian news aggregating site that offers up-to-date news
              from reputable sources in one place.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-3 mb-3">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/advertise" className="text-light text-decoration-none">Advertise With Us</a></li>
              <li><a href="/contactus" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="/privacypolicy" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Sources Section */}
          <div className="col-md-3 mb-3">
            <h5>Sources</h5>
            <ul className="list-unstyled">
              <li>PunchNG</li>
              <li>Fox News</li>
              <li>BBC</li>
              <li>Channels TV</li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="col-md-3 mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex footer-icons">
              <a href="https://www.facebook.com/profile.php?id=61574990331253" className="text-light me-3"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
              {/* <a href="#" className="text-light me-3"><FontAwesomeIcon icon={faTwitter} size="2x" /></a> */}
              {/* <a href="#" className="text-light me-3"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a> */}
              <a href="https://www.instagram.com/feedfusionnews/" className="text-light"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
            </div>
          </div>
        </div>

        <hr className="border-light" />

        {/* Copyright & Footer Info */}
        <div className="text-center">
          <p className="mb-0">
            Feedsfusion &copy; {new Date().getFullYear()} | All rights reserved | Designed by Ebuka
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
