// src/components/KafeProfile.js
import React, { useState } from "react";
import MenuEditor from "./MenuEditor";
import TableEditor from "./TableEditor";
import CafeInfoEditor from "./CafeInfoEditor";
import "../css/KafeProfile.css";

const KafeProfile = () => {
  const [activeSection, setActiveSection] = useState("menu");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="kafe-profile-container">
      <h1>Kafe Yönetimi</h1>
      <div className="button-group">
        <button
          className={activeSection === "menu" ? "active" : ""}
          onClick={() => handleSectionChange("menu")}
        >
          Menü Düzenle
        </button>
        <button
          className={activeSection === "tables" ? "active" : ""}
          onClick={() => handleSectionChange("tables")}
        >
          Masaları Düzenle
        </button>
        <button
          className={activeSection === "info" ? "active" : ""}
          onClick={() => handleSectionChange("info")}
        >
          Kafe Bilgilerini Güncelle
        </button>
      </div>
      <div className="editor-container">
        {activeSection === "menu" && <MenuEditor />}
        {activeSection === "tables" && <TableEditor />}
        {activeSection === "info" && <CafeInfoEditor />}
      </div>
    </div>
  );
};

export default KafeProfile;
