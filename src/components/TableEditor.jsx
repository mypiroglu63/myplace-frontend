import React, { useState, useEffect } from "react";
import axiosInstance from "../redux/axiosConfig";

const TableEditor = ({ cafeId }) => {
  const [tableCount, setTableCount] = useState("");
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/tables/${cafeId}`);
      setTables(response.data);
    } catch (error) {
      console.error("Masalar yüklenirken hata oluştu:", error);
    }
  };

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

  useEffect(() => {
    fetchTables();
  }, [cafeId]);

  return (
    <div>
      <h2>Masaları Düzenle</h2>
      <input
        type="number"
        placeholder="Masa sayısı"
        value={tableCount}
        onChange={(e) => setTableCount(e.target.value)}
      />
      <button onClick={handleCreateTables}>Masaları Oluştur</button>

      <ul>
        {tables.map((table) => (
          <li key={table.id}>
            Masa No: {table.tableNumber} - Durum: {table.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableEditor;
