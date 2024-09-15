import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Logo" className="header-logo" />
        <nav className="header-nav">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/menu">Menü</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Galeri</Link>
        </nav>
        <div className="header-actions">
          <Link to="/login" className="btn secondary">
            Giriş
          </Link>
          <Link to="/register" className="btn tertiary">
            Hemen Katıl
          </Link>
          <button className="btn orange">Masaları Gör</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
