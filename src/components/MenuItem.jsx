import React from "react";
import "../css/MenuItem.css";

const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>{item.price} TL</p>
    </div>
  );
};

export default MenuItem;
