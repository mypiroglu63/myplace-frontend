import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../redux/axiosConfig";
import "../css/Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Panelin açık olup olmadığını takip ediyoruz
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/search?query=${query}`);
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
    setSearchResults([]); // Arama sonuçlarını gizle
    setIsOpen(false); // Paneli kapat
    if (isUser) {
      navigate(`/profile/${id}`);
    } else {
      navigate(`/cafe/${id}`);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="open-search-btn">
        Ara
      </button>
      <div className={`search-container ${isOpen ? "open" : ""}`}>
        <button onClick={() => setIsOpen(false)} className="close-search-btn">
          Kapat
        </button>
        <input
          type="text"
          placeholder="Kullanıcı veya kafe ara..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div
                key={result.id}
                className="search-result-item"
                onClick={() => handleResultClick(result.id, !!result.fullName)}
              >
                <span>{result.fullName || result.name}</span>
              </div>
            ))
          ) : (
            <p>Sonuç yok</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
