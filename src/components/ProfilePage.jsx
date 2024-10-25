import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ProfilePage.css"; // Stil dosyasını unutma

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7777/api/user/profile"
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Profil bilgileri alınırken hata oluştu:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-page-container">
      <header className="profile-page-header">
        <h1>Hoşgeldiniz, {profile.fullName}</h1>
      </header>
      <main className="profile-page-main">
        <img
          src={profile.profileImageUrl || "/default-profile.png"}
          alt="Profil Resmi"
          className="profile-image"
        />
      </main>
      <footer className="profile-page-footer">
        <p>&copy; 2023 MyPlace</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
