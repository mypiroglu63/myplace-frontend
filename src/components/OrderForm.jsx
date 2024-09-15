import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/reducers/orderReducer";
import "../css/OrderForm.css";

const OrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    item: "",
    quantity: 1,
    tableNumber: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="order-form">
      <h2>Sipariş Formu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ürün:
          <input
            type="text"
            name="item"
            value={orderDetails.item}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Adet:
          <input
            type="number"
            name="quantity"
            value={orderDetails.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </label>
        <label>
          Masa Numarası:
          <input
            type="text"
            name="tableNumber"
            value={orderDetails.tableNumber}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sipariş Ver</button>
      </form>
    </div>
  );
};

export default OrderForm;
