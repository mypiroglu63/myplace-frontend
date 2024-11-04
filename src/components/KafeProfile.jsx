import React, { useState, useEffect } from "react";
import CafeInfoEditor from "./CafeInfoEditor";
import TableEditor from "./TableEditor";
import MenuEditor from "./MenuEditor";
import axiosInstance from "../redux/axiosConfig";
import { useNavigate } from "react-router-dom";

const KafeProfile = () => {
  const [cafeInfo, setCafeInfo] = useState(null);
  const cafeId = localStorage.getItem("cafeId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cafeId) {
      navigate("/home"); // Kafe girişi yoksa ana sayfaya yönlendir
      return;
    }

    const fetchCafeInfo = async () => {
      try {
        const response = await axiosInstance.get(`/api/cafe/${cafeId}`);

        if (response.data) {
          setCafeInfo(response.data);
        } else {
          const createResponse = await axiosInstance.post(`/api/cafe/create`, {
            name: "Yeni Kafe",
            address: "Adres bilgisi girilmemiş",
          });
          setCafeInfo(createResponse.data);
        }
      } catch (error) {
        console.error("Kafe bilgisi yüklenirken hata oluştu:", error);
      }
    };

    fetchCafeInfo();
  }, [cafeId, navigate]);

  return (
    <div>
      <h1>Kafe Yönetimi</h1>
      {cafeInfo && (
        <>
          <CafeInfoEditor cafeInfo={cafeInfo} setCafeInfo={setCafeInfo} />
          <TableEditor cafeId={cafeInfo.id} />
          <MenuEditor cafeId={cafeInfo.id} />
        </>
      )}
    </div>
  );
};

export default KafeProfile;
