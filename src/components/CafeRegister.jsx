import React, { useState } from "react";
import axiosInstance from "../redux/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

const CafeRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
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
      const response = await axiosInstance.post("/api/cafe/create", formData);
      if (response.status === 200) {
        navigate("/cafe/login");
      }
    } catch (error) {
      setErrorMessage("Kafe oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="logo">Yeni Kafe Oluştur</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Kafe Adı"
            required
            className="register-input"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Adres"
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta"
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Şifre"
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default CafeRegister;
