import React, { useState, useEffect } from "react";
import axios from "axios";

const Tables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    // Masaları backend'den çeken bir istek yapılır
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:7777/api/tables");
        setTables(response.data);
      } catch (error) {
        console.error("Masalar yüklenirken bir hata oluştu:", error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div>
      <h2>Masalar</h2>
      <div>
        {tables.map((table) => (
          <div key={table.id}>
            Masa Numarası: {table.tableNumber} - Durum: {table.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
