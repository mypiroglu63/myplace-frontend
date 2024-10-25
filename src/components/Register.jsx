import React, { useState } from "react";
import axiosInstance from "../redux/axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", formData);
      navigate("/login"); // Kayıt başarılı olursa login sayfasına yönlendir
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Kayıt başarısız oldu. Lütfen tekrar deneyin.";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Ad Soyad"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Şifre"
        />
        <button type="submit">Kayıt Ol</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
