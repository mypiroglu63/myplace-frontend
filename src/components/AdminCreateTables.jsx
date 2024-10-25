import React, { useState } from "react";
import axios from "axios";
import "../css/AdminCreateTables.css";

const AdminCreateTables = () => {
  const [tableCount, setTableCount] = useState(1);
  const [cafeId, setCafeId] = useState("");

  const handleCreateTables = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7777/api/tables/admin/createTables",
        null,
        {
          params: {
            count: tableCount,
            cafeId: cafeId,
          },
        }
      );
      if (response.status === 200) {
        alert("Masalar başarıyla oluşturuldu.");
      }
    } catch (error) {
      console.error("Masalar oluşturulurken bir hata oluştu:", error);
      alert("İşlem başarısız oldu, tekrar deneyin.");
    }
  };

  return (
    <div className="admin-create-tables-container">
      <h2>Masa Oluştur</h2>
      <form onSubmit={handleCreateTables}>
        <label>
          Masa Sayısı:
          <input
            type="number"
            value={tableCount}
            onChange={(e) => setTableCount(e.target.value)}
            min="1"
            required
          />
        </label>
        <label>
          Kafe ID:
          <input
            type="text"
            value={cafeId}
            onChange={(e) => setCafeId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Masaları Oluştur</button>
      </form>
    </div>
  );
};

export default AdminCreateTables;
