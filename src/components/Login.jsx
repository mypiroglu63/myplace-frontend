// src/components/Login.jsx
import React, { useState } from "react";
import axiosInstance from "../redux/axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
        user.isAdmin = user.roles.some(
          (role) => role.authority === "ROLE_ADMIN"
        );
        user.isUser = user.roles.some((role) => role.authority === "ROLE_USER");

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);

        setIsLoggedIn(true);
        setUser(user);

        // Rol tabanlı yönlendirme
        if (user.isAdmin) {
          navigate("/admin/kafe-profile");
        } else {
          navigate(`/profile/${user.id}`);
        }
      }
    } catch (error) {
      console.error(
        "Login sırasında hata oluştu:",
        error.response?.data || error.message
      );
      setErrorMessage(
        "Giriş işlemi sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Şifre:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
