import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../redux/axiosConfig";
import "../css/Sidebar.css";

const Sidebar = ({ setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false); // Kullanıcıyı logout yap
    setUser(null); // Kullanıcı bilgisini sıfırla
    navigate("/login"); // Login sayfasına yönlendir
  };

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

  const handleResultClick = (id, isUser) => {
    setSearchMode(false);
    if (isUser) {
      navigate(`/profile/${id}`);
    } else {
      navigate(`/cafe/${id}`);
    }
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <h2>Logo</h2>
      <ul>
        {!searchMode ? (
          <>
            <li>
              <Link to="/home">Ana Sayfa</Link>
            </li>
            <li>
              <a href="#" onClick={() => setSearchMode(true)}>
                Ara
              </a>
            </li>
            <li>
              <a href="#">Yakındaki Mekanlar</a>
            </li>
            <li>
              <a href="#">Mesajlar</a>
            </li>
            <li>
              <a href="#">Bildirimler</a>
            </li>
            <li>
              <Link to={`/profile/${userId}`}>Profil</Link>
            </li>
          </>
        ) : (
          <div className="search-section">
            <input
              type="text"
              placeholder="Kullanıcı veya kafe ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
              className="search-input"
            />
            <button
              onClick={() => setSearchMode(false)}
              className="close-search-btn"
            >
              Çık
            </button>
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() =>
                      handleResultClick(result.id, !!result.fullName)
                    }
                  >
                    {result.fullName || result.name}
                  </div>
                ))
              ) : (
                <p>Sonuç yok</p>
              )}
            </div>
          </div>
        )}
      </ul>
      {!searchMode && (
        <div className="sidebar-actions">
          <button
            className="more-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Daha Az" : "Daha Fazla"}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
