import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Clothify</h3>
          <p>នាំមកជូននូវម៉ូដសម្លៀកបំពាក់ទាន់សម័យ និងគុណភាពខ្ពស់។</p>

          <div className="social-icons">
            <a href="https://www.facebook.com/clothify" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/clothify" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/clothify" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: pheachseyhak@clothify.com</p>
          <p>Phone: +855 71 45 68 013</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Clothify Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;