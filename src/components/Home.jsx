import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Suggestions from "./Suggestions";
import "../css/Home.css";

const Home = ({ setIsLoggedIn, setUser }) => {
  // setIsLoggedIn ve setUser props olarak alındı
  return (
    <div className="home-container">
      <Sidebar setIsLoggedIn={setIsLoggedIn} setUser={setUser} />{" "}
      {/* Sidebar'a props olarak geçildi */}
      <Feed />
      <Suggestions />
    </div>
  );
};

export default Home;
