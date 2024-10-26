import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import About from "./components/About";
import Profile from "./components/Profile";
import KafeProfile from "./components/KafeProfile"; // Admin kullanıcılar için profil
import OrderForm from "./components/OrderForm";
import CommentSection from "./components/CommentSection";
import Register from "./components/Register";
import Gallery from "./components/Gallery";
import FullGallery from "./components/FullGallery";
import Tables from "./components/Tables";
import AdminCreateTables from "./components/AdminCreateTables";
import ImageSlider from "./components/ImageSlider";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./css/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.isAdmin = parsedUser.roles.some(
        (role) => role.authority === "ROLE_ADMIN"
      );
      parsedUser.isUser = parsedUser.roles.some(
        (role) => role.authority === "ROLE_USER"
      );
      setIsLoggedIn(true);
      setUser(parsedUser);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {user?.isAdmin ? (
            <>
              {/* Header yalnızca admin için görüntülenir */}
              <Header
                isLoggedIn={isLoggedIn}
                user={user}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
              <Routes>
                {/* Admin için Kafe Profile sayfası */}
                <Route
                  path="/profile/:userId"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <KafeProfile />
                    </ProtectedRoute>
                  }
                />
                {/* Diğer sayfalardan gelen yönlendirmeleri KafeProfile'a gönder */}
                <Route path="*" element={<KafeProfile />} />
              </Routes>
            </>
          ) : (
            <>
              <Header
                isLoggedIn={isLoggedIn}
                user={user}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
              <div className="main-content">
                <Routes>
                  <Route
                    path="*"
                    element={
                      <>
                        <ImageSlider />
                        <div className="right-panel">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                              path="/login"
                              element={
                                <Login
                                  setIsLoggedIn={setIsLoggedIn}
                                  setUser={(user) => {
                                    user.isAdmin = user.roles.some(
                                      (role) => role.authority === "ROLE_ADMIN"
                                    );
                                    user.isUser = user.roles.some(
                                      (role) => role.authority === "ROLE_USER"
                                    );
                                    setUser(user);
                                  }}
                                />
                              }
                            />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route
                              path="/fullgallery"
                              element={<FullGallery />}
                            />
                          </Routes>
                        </div>
                      </>
                    }
                  />
                  {/* Dinamik Profil Sayfası */}
                  <Route
                    path="/profile/:userId"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <OrderForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/comments"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <CommentSection comments={[]} addComment={() => {}} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tables"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Tables />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/create-tables"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <AdminCreateTables />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
