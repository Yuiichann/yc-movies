import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer section">
      <p className="copyright">
        Copyright © 2022 - <Link to="/">YC Movies</Link>
      </p>

      <div className="contact">
        <p>Contact</p>

        <div className="social-link">
          <a href="https://github.com/Yuiichann" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.facebook.com/hiiradesu/" target="_blank">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://twitter.com/?lang=vi" target="_blank">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
