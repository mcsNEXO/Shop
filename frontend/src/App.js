import "./App.css";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header/Header";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Layout/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Login from "./pages/Auth/Login/Login";
import AuthContext from "./context/authContext";
import Register from "./pages/Auth/Register/Register";
import { reducer, initialState } from "./reducer";
import Profile from "./pages/Profile/Profile";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const header = <Header />;
  const nav = <Nav />;
  const menu = (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="profile" element={<Profile />}>
        <Route path="favorite" element />
      </Route>
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
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <Layout header={header} nav={nav} menu={menu} footer={footer} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
