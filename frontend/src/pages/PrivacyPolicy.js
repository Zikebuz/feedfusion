import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: 27/03/2005</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to <strong>Feedfusion</strong>. We are committed to protecting your privacy and ensuring the security of your personal information.
        This Privacy Policy outlines how we collect, use, and protect your data when you visit our website.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        When you visit our site, we may collect the following information:
      </p>
      <ul>
        <li>Personal details (e.g., name, email) when you contact us.</li>
        <li>Usage data, including IP address, browser type, and pages visited.</li>
        <li>Cookies and tracking technologies to enhance user experience.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the collected data for the following purposes:</p>
      <ul>
        <li>To improve our content and user experience.</li>
        <li>To respond to inquiries and provide support.</li>
        <li>To analyze traffic and enhance website functionality.</li>
        <li>To display relevant advertisements.</li>
      </ul>

      <h2>4. Cookies & Tracking Technologies</h2>
      <p>
        We use cookies to enhance your experience. You can adjust your browser settings to disable cookies, but this may affect site functionality.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        Our website may include links to third-party services, such as news sources and advertisers. We are not responsible for their privacy policies.
      </p>

      <h2>6. Data Protection & Security</h2>
      <p>
        We implement security measures to protect your data but cannot guarantee 100% security due to the nature of the internet.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        You have the right to request access, correction, or deletion of your personal data. Contact us for any privacy-related requests.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Continued use of our site after any changes means you accept the updated policy.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please{" "}
        <a href="/contactus" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
          contact us
        </a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
