import React, { useEffect, useState } from "react";
import axiosInstance from "../redux/axiosConfig";
import "../css/Suggestions.css";

const Suggestions = () => {
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Kullanıcı bilgilerini ve önerileri al
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axiosInstance.get(`/api/user/profile/${userId}`);
        setUser(response.data);

        const suggestionResponse = await axiosInstance.get(
          `/api/user/suggestions`
        );
        setSuggestions(suggestionResponse.data);
      } catch (error) {
        console.error("Veri alınırken hata oluştu", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="suggestions">
      {user && (
        <div className="user-info">
          <img
            src={user.profileImageUrl || "/default-profile.png"}
            alt="Profil Resmi"
            className="profile-image"
          />
          <div>
            <span className="username">{user.fullName}</span>
            <p className="user-desc">{user.email}</p>
            <a href="#" className="switch-account">
              Geçiş Yap
            </a>
          </div>
        </div>
      )}

      <h3>Senin İçin Öneriler</h3>
      <div className="recommendations">
        {suggestions.map((suggestion) => (
          <div className="suggestion" key={suggestion.id}>
            <img
              src={suggestion.profileImageUrl || "/default-profile.png"}
              alt="Öneri Profil Resmi"
              className="suggestion-image"
            />
            <div>
              <span>{suggestion.fullName || suggestion.name}</span>
              <p>{suggestion.mutualConnections} takip ediyor</p>
            </div>
            <a href="#" className="follow-btn">
              Takip Et
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
