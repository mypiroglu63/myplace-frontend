import React, { useState, useEffect } from "react";
import axiosInstance from "../redux/axiosConfig";

const CafeInfoEditor = ({ cafeInfo, setCafeInfo }) => {
  const handleSave = async () => {
    try {
      await axiosInstance.put(`/api/admin/cafe/${cafeInfo.id}`, cafeInfo);
      alert("Kafe bilgileri başarıyla güncellendi!");
    } catch (error) {
      console.error("Kafe bilgileri güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <h2>Kafe Bilgilerini Güncelle</h2>
      <input
        type="text"
        placeholder="Kafe Adı"
        value={cafeInfo.name || ""}
        onChange={(e) => setCafeInfo({ ...cafeInfo, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Adres"
        value={cafeInfo.address || ""}
        onChange={(e) => setCafeInfo({ ...cafeInfo, address: e.target.value })}
      />
      <button onClick={handleSave}>Kaydet</button>
    </div>
  );
};

export default CafeInfoEditor;
