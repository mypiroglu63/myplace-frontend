import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Profile.css";
import axiosInstance from "../redux/axiosConfig";

const Profile = () => {
  const { userId } = useParams();
  const loggedInUserId = localStorage.getItem("userId");
  const isOwner = parseInt(loggedInUserId) === parseInt(userId); // Sadece kendi profilinde düzenleme yapılabilir

  const [profile, setProfile] = useState({
    fullName: "",
    profileImageUrl: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/api/user/profile/${userId}`);
        setProfile(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Profil bilgileri alınırken bir hata oluştu.");
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      await axiosInstance.post(`/api/user/profile/update/${userId}`, profile);
      setSuccessMessage("Profil başarıyla güncellendi!");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage("Profil güncellenirken bir hata oluştu.");
    }
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="profile-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <div className="profile-image">
        <img
          src={profile.profileImageUrl || "/default-profile.png"}
          alt="Profil Resmi"
        />
      </div>
      <h2>{profile.fullName || "Kullanıcı Adı"}</h2>
      <div className="address-section">
        <h3>Adres Bilgileri</h3>
        <label>Sokak: </label>
        <input
          type="text"
          value={profile.street || ""}
          onChange={(e) => setProfile({ ...profile, street: e.target.value })}
          disabled={!isEditing || !isOwner} // Sadece profil sahibi düzenleyebilir
        />
        <label>Şehir: </label>
        <input
          type="text"
          value={profile.city || ""}
          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
          disabled={!isEditing || !isOwner}
        />
        <label>Eyalet: </label>
        <input
          type="text"
          value={profile.state || ""}
          onChange={(e) => setProfile({ ...profile, state: e.target.value })}
          disabled={!isEditing || !isOwner}
        />
        <label>Posta Kodu: </label>
        <input
          type="text"
          value={profile.postalCode || ""}
          onChange={(e) =>
            setProfile({ ...profile, postalCode: e.target.value })
          }
          disabled={!isEditing || !isOwner}
        />
        <label>Ülke: </label>
        <input
          type="text"
          value={profile.country || ""}
          onChange={(e) => setProfile({ ...profile, country: e.target.value })}
          disabled={!isEditing || !isOwner}
        />
      </div>
      {isOwner && ( // Düzenleme butonları sadece profil sahibi için görünür
        <>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "İptal" : "Profili Düzenle"}
          </button>
          {isEditing && <button onClick={handleSave}>Kaydet</button>}
        </>
      )}
    </div>
  );
};

export default Profile;
