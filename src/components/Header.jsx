import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axiosInstance from "../redux/axiosConfig";
import "../css/Header.css";

const SESSION_DURATION = 30 * 60 * 1000; // 30 dakika (ms cinsinden)

const Header = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Oturum süresi dolduğunda kontrol fonksiyonu
  const checkSessionTimeout = () => {
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      const currentTime = new Date().getTime();
      if (currentTime - loginTime > SESSION_DURATION) {
        handleLogout(); // Süre dolmuşsa çıkış yap
      }
    }
  };

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginTime");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu", error);
    }
  };

  // Oturum açıldığında login zamanını kaydedin
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("loginTime", new Date().getTime()); // Giriş zamanını kaydedin
    }
  }, [isLoggedIn]);

  // Oturum süresini kontrol et
  useEffect(() => {
    const interval = setInterval(checkSessionTimeout, 60 * 1000); // Her dakika oturum süresini kontrol et
    return () => clearInterval(interval); // Temizlik yap
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/search?query=${searchQuery}`
      );
      const data = response.data;

      const sortedResults = data.sort((a, b) => {
        const nameA = a.fullName || a.name;
        const nameB = b.fullName || b.name;
        return nameA.localeCompare(nameB);
      });

      setSearchResults(sortedResults);
    } catch (error) {
      console.error("Arama yaparken hata oluştu", error);
    }
  };

  const handleProfileClick = (id) => {
    setSearchResults([]); // Arama sonuçlarını gizle
    navigate(`/profile/${id}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Logo" className="header-logo" />
        <nav className="header-nav">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/menu">Menü</Link>
          <Link to="/about">Hakkında</Link>
          <Link to="/gallery">Galeri</Link>
        </nav>
        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <span>Hoş geldiniz, {user && user.fullName}</span>
              <button className="btn orange" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn secondary">
                Giriş
              </Link>
              <Link to="/register" className="btn tertiary">
                Hemen Katıl
              </Link>
            </>
          )}
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Kullanıcı veya kafe ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Ara
          </button>
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result) => (
                <div key={result.id} className="search-result-item">
                  <span>{result.fullName || result.name}</span>
                  {result.fullName ? (
                    <button
                      className="btn profile-btn"
                      onClick={() => handleProfileClick(result.id)}
                    >
                      Profile Git
                    </button>
                  ) : (
                    <button
                      className="btn cafe-btn"
                      onClick={() => navigate(`/cafe/${result.id}`)}
                    >
                      Cafe Detayına Git
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
