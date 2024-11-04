import React, { useState } from "react";
import axiosInstance from "../redux/axiosConfig";
import { useNavigate } from "react-router-dom";

const CreateCafe = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleCreateCafe = async () => {
    try {
      const response = await axiosInstance.post("/api/admin/cafe/create", {
        name,
        address,
        ownerId: userId,
      });
      alert("Kafe başarıyla oluşturuldu!");
      navigate(`/profile/${userId}`); // Kafe oluşturulunca profil sayfasına yönlendir
    } catch (error) {
      console.error("Kafe oluşturulurken hata oluştu.", error);
    }
  };

  return (
    <div>
      <h2>Yeni Kafe Oluştur</h2>
      <input
        type="text"
        placeholder="Kafe Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Adres"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleCreateCafe}>Oluştur</button>
    </div>
  );
};

export default CreateCafe;
