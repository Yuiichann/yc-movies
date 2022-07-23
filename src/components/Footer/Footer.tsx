import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
const Footer = () => {
  return (
    <div className="footer section">
      <p>
        Copyright © 2022 - <Link to="/">YC Movies</Link>
      </p>
    </div>
  );
};

export default Footer;
