import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../redux/axiosConfig";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasCafe, setHasCafe] = useState(false);
  const userId = localStorage.getItem("userId"); // LocalStorage'dan userId alınıyor

  useEffect(() => {
    const checkCafeOwnership = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admin/cafe/ownership/${userId}`
        );
        if (response.data) {
          setHasCafe(true); // Kafeye sahipse
        } else {
          setHasCafe(false); // Kafeye sahip değilse
        }
        setLoading(false);
      } catch (error) {
        console.error("Kafe sahipliği kontrolü yapılırken hata oluştu:", error);
        setLoading(false);
      }
    };

    checkCafeOwnership();
  }, [userId]);

  useEffect(() => {
    if (!loading) {
      if (hasCafe) {
        navigate("/cafe-profile"); // Kafeye sahipse, profil sayfasına yönlendir
      } else {
        navigate("/create-cafe"); // Kafeye sahip değilse, kafe yaratma sayfasına yönlendir
      }
    }
  }, [loading, hasCafe, navigate]);

  return loading ? <div>Yükleniyor...</div> : null;
};

export default AdminDashboard;
