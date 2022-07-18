import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header/Header";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Layout/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Login from "./pages/Auth/Login/Login";
import AuthContext from "./components/context/authContext";

function App() {
  const header = (
    <Routes>
      <Route path="/" element={<Header />} />
    </Routes>
  );
  const nav = <Nav />;
  const menu = (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/news" element={<div>News</div>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
  const footer = <Footer />;
  return (
    <Router>
      <AuthContext.Provider>
        <Layout header={header} nav={nav} menu={menu} footer={footer} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
