import "@/styles/legal.css";

export const metadata = {
    title: "Terms and Conditions - Music by Illuzon",
    description: "Terms and Conditions for Music by Illuzon.",
  };
  
  export default function LegalPage() {
    return (
      <>
        <div className="container">
          <h1>Terms and Conditions</h1>
  
          <h2>1. About Us</h2>
          <p>
            This website is operated by Illuzon, a music producer. It serves as a platform to share updates about music
            gigs, sample packs, Spotify releases, YouTube content, and other relevant artist updates.
          </p>
  
          <h2>2. Subscription and Notifications</h2>
          <p>By entering your email address via the &quot;Notify Me&quot; or subscription form:</p>
          <ul>
            <li>
              You consent to receive emails about website updates, sample pack releases, discounts, Spotify releases,
              YouTube content updates, and other major announcements.
            </li>
          </ul>
  
          <h2>3. Payment Terms (if applicable)</h2>
          <p>
            Prices for sample packs or other products are listed in INR and are subject to change without notice.
            Payments are processed through secure third-party platforms.
          </p>
  
          <h2>4. User Responsibilities</h2>
          <p>
            Ensure that the email address provided is accurate and up-to-date. You may not use the website for unlawful
            purposes or to infringe on intellectual property.
          </p>
  
          <h2>5. Opting Out</h2>
          <p>
            You can unsubscribe from notifications at any time by clicking the &quot;Unsubscribe&quot; link in any email or
            contacting us directly at{" "}
            <a href="mailto:support@musicbyilluzon.in">support@musicbyilluzon.in</a>
          </p>
  
          <h2>6. Changes to These Terms</h2>
          <p>
            We reserve the right to update these Terms and Conditions at any time. Continued use of the website and
            subscription service constitutes acceptance of the updated terms.
          </p>
  
          <h2>7. Governing Law</h2>
          <p>These Terms and Conditions are governed by the laws of India. Any disputes will be resolved in the courts of India.</p>
  
          <h2>8. Contact Information</h2>
          <p>For any inquiries or support, please contact us at:</p>
          <p>
            Email: <a href="mailto:support@musicbyilluzon.in">support@musicbyilluzon.in</a>
          </p>
        </div>
  
        <footer>
          Copyright © 2026 <a href="#">Music by Illuzon</a> - All Rights Reserved.
        </footer>
      </>
    );
  }
  