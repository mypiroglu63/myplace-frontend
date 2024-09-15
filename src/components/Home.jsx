import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMenuItems } from "../redux/reducers/menuReducer";
import MenuItem from "./MenuItem";
import "../css/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.items);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("/api/menu");
        dispatch(setMenuItems(response.data));
      } catch (error) {
        console.error("Menü öğeleri alınırken bir hata oluştu:", error);
      }
    };
    fetchMenuItems();
  }, [dispatch]);

  return (
    <div className="home">
      <h1>Sipariş vermek için lütfen giriş yapınız</h1>
      <div className="menu-list">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
