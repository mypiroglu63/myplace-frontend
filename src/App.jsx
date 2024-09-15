import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

import Menu from "./components/Menu";
import Contact from "./components/Contact";
import About from "./components/About";
import Profile from "./components/Profile";
import OrderForm from "./components/OrderForm";
import CommentSection from "./components/CommentSection";
import Register from "./components/Register";
import Gallery from "./components/Gallery";
import FullGallery from "./components/FullGallery";
import ImageSlider from "./components/ImageSlider";

import "./css/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <ImageSlider />
          <div className="right-panel">
            <Routes>
              <Route path="/" element={<Menu />} />

              <Route path="/menu" element={<Menu />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order" element={<OrderForm />} />
              <Route
                path="/comments"
                element={<CommentSection comments={[]} addComment={() => {}} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/fullgallery" element={<FullGallery />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
