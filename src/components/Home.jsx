import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMenuItems } from "../redux/reducers/menuReducer";
import "../css/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.items); // Store'dan menü öğelerini al

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(""); // API'den menü öğelerini getir
        dispatch(setMenuItems(response.data)); // Menü öğelerini redux store'a ekle
      } catch (error) {
        console.error("Menü öğeleri alınırken bir hata oluştu:", error);
      }
    };
    fetchMenuItems();
  }, [dispatch]);

  // Eğer menuItems dizisi yoksa, boş bir dizi kullan
  return (
    <div className="home">
      <h1>Sipariş vermek için lütfen giriş yapınız</h1>
      <div className="menu-list">
        {Array.isArray(menuItems) && menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>Menü şu an boş, daha sonra tekrar deneyiniz.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
