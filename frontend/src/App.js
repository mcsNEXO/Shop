import "./App.css";
import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header/Header";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Layout/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Login from "./pages/Auth/Login/Login";
import AuthContext from "./components/context/authContext";
import Register from "./pages/Auth/Register/Register";

function App() {
  const initialState = { isAuthentiacted: false };

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return { ...state, isAuthentiacted: true };
      case "logout":
        return { ...state, isAuthentiacted: false };
      default:
        throw new Error("This action does not exist: ".action.type);
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const header = <Header />;
  const nav = <Nav />;
  const menu = (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/news" element={<div>News</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
  const footer = <Footer />;
  return (
    <Router>
      <AuthContext.Provider
        value={{
          isAuthentiacted: state.isAuthentiacted,
          login: () => dispatch({ type: "login" }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <Layout header={header} nav={nav} menu={menu} footer={footer} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
