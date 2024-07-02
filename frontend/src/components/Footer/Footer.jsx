import React, { useState } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  const handleCallPhoneNumber = () => {
    const phoneNumber = "0903312258";
    if (window.confirm(`Call ${phoneNumber}?`)) {
      window.open(`tel:${phoneNumber}`);
    }
  };

  const handleSendEmail = () => {
    const emailAddress = "nhiphm302@gmail.com";
    window.open(`mailto:${emailAddress}`);
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Welcome to More Than Happy! We are dedicated to creating delightful
            moments with our delicious cakes and treats. Join us in celebrating
            life’s sweet moments.
          </p>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=100068924952791"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/morethanhappy_cakedecor/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li onClick={handleCallPhoneNumber}>0903312258</li>
            <li onClick={handleSendEmail}>nhiphm302@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; More Than Happy.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
