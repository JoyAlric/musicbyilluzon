export default function Footer() {
  const currentYear = new Date().getFullYear();

    return (
      <div className="foot">
        <p className="cr">Copyright © {currentYear} Music by Illuzon - All Rights Reserved.</p>
      </div>
    );
  }