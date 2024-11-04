import React, { useState } from "react";
import axiosInstance from "../redux/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

const CafeLogin = ({ setIsCafeLoggedIn }) => {
  // setIsCafeLoggedIn prop'u eklendi
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/cafe/login", formData);

      if (response.status === 200) {
        const { cafe } = response.data;
        localStorage.setItem("cafe", JSON.stringify(cafe));
        localStorage.setItem("cafeId", cafe.id);
        setIsCafeLoggedIn(true); // Oturum durumu güncelleniyor
        navigate("/home"); // Ana sayfaya yönlendirme
      }
    } catch (error) {
      setErrorMessage("Cafe girişi sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="logo">Mekan Paneli Girişi</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Cafe E-posta"
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Şifre"
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Giriş Yap
          </button>
        </form>
        <div className="register-link">
          <Link to="/cafe/register">Yeni Kafe Oluştur</Link>
        </div>
      </div>
    </div>
  );
};

export default CafeLogin;
