// src/components/Login.jsx
import React, { useState } from "react";
import axiosInstance from "../redux/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

const Login = ({ setIsLoggedIn, setUser }) => {
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
      const response = await axiosInstance.post("/auth/login", formData);

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);
        setIsLoggedIn(true);
        setUser(user);
        navigate(`/home/${user.id}`);
      }
    } catch (error) {
      setErrorMessage(
        "Giriş işlemi sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="logo">Logo</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Telefon numarası, kullanıcı adı veya e-posta"
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
        <div className="separator">YA DA</div>
        <button className="facebook-button">Facebook ile Giriş Yap</button>
        <p className="forgot-password">Şifreni mi unuttun?</p>
        <p className="signup">
          Hesabın yok mu? <span className="signup-link">Kaydol</span>
        </p>
        <Link to="/cafe/login" className="mekan-paneli-button">
          Mekan Paneli
        </Link>
      </div>
    </div>
  );
};

export default Login;
