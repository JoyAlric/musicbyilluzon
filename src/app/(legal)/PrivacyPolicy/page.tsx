import "@/styles/legal.css";

export const metadata = {
    title: "Privacy Policy - Music by Illuzon",
    description: "Privacy Policy for Music by Illuzon.",
  };
  
  export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear();
    return (
      <>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>
            At <strong>Music By Illuzon</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
  
          <h2>1. Information We Collect</h2>
          <p>We may collect the following personal information:</p>
          <ul>
            <li><strong>Email Address:</strong> Used to send you notifications and updates.</li>
            <li><strong>Optional Information:</strong> Any additional details you choose to provide.</li>
          </ul>
  
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Sending email notifications about sample packs, gigs, and music updates.</li>
            <li>Sharing news about Spotify and YouTube releases.</li>
            <li>Informing you of discounts, promotions, and other major updates.</li>
          </ul>
  
          <h2>3. Data Storage</h2>
          <p>Email addresses are collected using Google Scripts and securely stored in Google Sheets. Access to this data is restricted to authorized personnel only.</p>
  
          <h2>4. Data Retention</h2>
          <p>We retain your email address until you unsubscribe or request deletion. After unsubscribing, we will delete your data unless required for legal purposes.</p>
  
          <h2>5. Sharing Your Information</h2>
          <p>We do not sell or share your email address with third parties, except:</p>
          <ul>
            <li>With service providers who assist in sending newsletters and notifications.</li>
            <li>As required by law or legal processes.</li>
          </ul>
  
          <h2>6. Your Rights</h2>
          <p>You have the right to access, update, or correct your personal information. You can unsubscribe from notifications at any time by clicking &quot;Unsubscribe&quot; in our emails or contacting us at <a href="mailto:support@musicbyilluzon.in">support@musicbyilluzon.in</a></p>
  
          <h2>7. Cookies and Tracking</h2>
          <p>Our website may use cookies to improve user experience and track website usage statistics. You can disable cookies in your browser settings.</p>
  
          <h2>8. Security Measures</h2>
          <p>We implement security measures such as encryption and restricted access to safeguard your personal information.</p>
  
          <h2>9. Updates to This Policy</h2>
          <p>We may update this Privacy Policy periodically. The updated version will be posted on this page with a new effective date.</p>
  
          <h2>10. Contact Information</h2>
          <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
          <p>Email: <a href="mailto:support@musicbyilluzon.in">support@musicbyilluzon.in</a></p>
        </div>
  
        <footer>
          Copyright © {currentYear} <a href="#">Music by Illuzon</a> - All Rights Reserved.
        </footer>
      </>
    );
  }