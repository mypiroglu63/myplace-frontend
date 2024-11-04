import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import CafeLogin from "./components/CafeLogin";
import CafeRegister from "./components/CafeRegister";
import Home from "./components/Home";
import Profile from "./components/Profile";
import KafeProfile from "./components/KafeProfile";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./css/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isCafeLoggedIn, setIsCafeLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCafe = localStorage.getItem("cafe");

    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else if (storedCafe) {
      setIsCafeLoggedIn(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Kullanıcı veya Cafe giriş yapmamışsa login sayfasına yönlendirme */}
            {!isLoggedIn && !isCafeLoggedIn ? (
              <>
                <Route
                  path="/login"
                  element={
                    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
                  }
                />
                <Route
                  path="/cafe/login"
                  element={<CafeLogin setIsCafeLoggedIn={setIsCafeLoggedIn} />}
                />
                <Route path="/cafe/register" element={<CafeRegister />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : isLoggedIn ? (
              <>
                {/* Kullanıcı girişi yapıldıysa ana sayfa ve profil sayfasına yönlendirme */}
                <Route
                  path="/home"
                  element={
                    <Home setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
                  }
                />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            ) : (
              <>
                {/* Cafe girişi yapıldıysa cafe profil sayfasına yönlendirme */}
                <Route path="/home" element={<Home />} />
                <Route path="/cafe/profile" element={<KafeProfile />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
