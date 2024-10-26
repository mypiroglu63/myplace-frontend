import React, { useState, useEffect } from "react";
import axiosInstance from "../redux/axiosConfig";

const MenuEditor = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    // Kategorileri yükle
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/api/admin/categories/all");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    const response = await axiosInstance.post("/api/admin/categories/create", {
      name: newCategory,
    });
    setCategories([...categories, response.data]);
    setNewCategory("");
  };

  const handleAddProduct = async () => {
    const response = await axiosInstance.post(
      "/api/admin/products/create",
      {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      },
      { params: { categoryName: newProduct.category } }
    );
    setProducts([...products, response.data]);
    setNewProduct({ name: "", price: "", category: "" });
  };

  return (
    <div>
      <h2>Menü Düzenleme</h2>
      <div>
        <h3>Kategori Ekle</h3>
        <input
          type="text"
          placeholder="Yeni kategori adı"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Kategori Ekle</button>
      </div>

      <div>
        <h3>Ürün Ekle</h3>
        <input
          type="text"
          placeholder="Ürün adı"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <select
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          <option value="">Kategori seç</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddProduct}>Ürün Ekle</button>
      </div>
    </div>
  );
};

export default MenuEditor;
