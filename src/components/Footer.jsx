// src/components/Footer.js
import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <a href="#">Meta</a>
        <a href="#">Hakkında</a>
        <a href="#">Blog</a>
        <a href="#">İş Fırsatları</a>
        <a href="#">Yardım</a>
        <a href="#">API</a>
        <a href="#">Gizlilik</a>
        <a href="#">Koşullar</a>
        <a href="#">Konumlar</a>
      </div>
      <div className="footer-bottom">
        <span>Türkçe</span> | <span>© 2024 DEDE BİSTRO COFFEE</span>
      </div>
    </footer>
  );
};

export default Footer;
