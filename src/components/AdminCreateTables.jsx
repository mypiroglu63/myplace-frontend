import React, { useState, useEffect } from "react";
import axiosInstance from "../redux/axiosConfig";

const AdminCreateTables = ({ cafeId }) => {
  const [tableCount, setTableCount] = useState("");
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, [cafeId]);

  // Mevcut masaları getir
  const fetchTables = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/tables/${cafeId}`);
      setTables(response.data);
    } catch (error) {
      console.error("Masalar yüklenirken hata oluştu.", error);
    }
  };

  // Yeni masalar oluştur
  const handleCreateTables = async () => {
    try {
      await axiosInstance.post("/api/admin/tables/create", null, {
        params: { count: tableCount, cafeId },
      });
      alert("Masalar başarıyla oluşturuldu!");
      setTableCount("");
      fetchTables();
    } catch (error) {
      alert("Masa oluşturulurken hata oluştu.");
      console.error(error);
    }
  };

  // Masayı sil
  const handleDeleteTable = async (tableId) => {
    try {
      await axiosInstance.delete(`/api/admin/tables/delete/${tableId}`);
      alert("Masa başarıyla silindi!");
      fetchTables();
    } catch (error) {
      alert("Masa silinirken hata oluştu.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Masaları Düzenle</h2>
      <div>
        <input
          type="number"
          placeholder="Masa sayısı"
          value={tableCount}
          onChange={(e) => setTableCount(e.target.value)}
        />
        <button onClick={handleCreateTables}>Masaları Oluştur</button>
      </div>

      <h3>Mevcut Masalar</h3>
      <ul>
        {tables.map((table) => (
          <li key={table.id}>
            <span>
              Masa No: {table.tableNumber} - Durum: {table.status}
            </span>
            <button onClick={() => handleDeleteTable(table.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCreateTables;
