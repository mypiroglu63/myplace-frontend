import React, { useState, useEffect } from "react";
import axiosInstance from "../redux/axiosConfig";

const CafeInfoEditor = () => {
  const [cafeInfo, setCafeInfo] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    // Kafe bilgilerini yükle
    const fetchCafeInfo = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/cafes/all");
        setCafeInfo(response.data[0]); // İlk kafeyi yüklüyoruz, dinamik hale getirilebilir
      } catch (error) {
        console.error("Kafe bilgileri yüklenirken hata oluştu:", error);
      }
    };
    fetchCafeInfo();
  }, []);

  const handleSave = async () => {
    try {
      await axiosInstance.post("/api/admin/cafes/create", cafeInfo);
      alert("Kafe bilgileri kaydedildi!");
    } catch (error) {
      alert("Kafe bilgileri kaydedilirken hata oluştu.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Kafe Bilgilerini Güncelle</h2>
      <input
        type="text"
        placeholder="Kafe Adı"
        value={cafeInfo.name}
        onChange={(e) => setCafeInfo({ ...cafeInfo, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Adres"
        value={cafeInfo.address}
        onChange={(e) => setCafeInfo({ ...cafeInfo, address: e.target.value })}
      />
      <button onClick={handleSave}>Kaydet</button>
    </div>
  );
};

export default CafeInfoEditor;
