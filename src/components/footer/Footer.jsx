import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Link to="/"><img className="logo" src={assets.logo} alt="" /></Link>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            et recusandae vero nesciunt temporibus repudiandae! Ipsum reiciendis
            dolorem dolore accusantium rerum nobis illum eveniet, temporibus
            magni quibusdam vitae, ipsa laudantium.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>

        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li><a href="tel:+90054811585">+900-5481-1585</a></li>
            <li><a href="mailto:whitepotato121@gmail.com">whitepotato121@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright © 2024 Whitepotato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
