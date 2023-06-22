import "./App.scss";
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
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { reducer, initialState } from "./reducer";
import Profile from "./pages/Profile/Profile";
import MyData from "./pages/Profile/MyData/MyData";
import ProfilePage from "./pages/Profile/ProfilePage/ProfilePage";
import RequireAuth from "./hoc/RequireAuth";
import RequireAdmin from "./hoc/RequireAdmin";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import CartContext from "./context/cartContext";
import ErrorContext from "./context/errorContext";
import FilterHandlerContext from "./context/filterHandlerContext";
import Favorite from "./pages/Favorite/Favorite";
import FavoriteContext from "./context/favoriteContext";
import AddProduct from "./pages/AdminPanel/AddProduct/AddProduct";
import Products from "./pages/Products/Products";
import Checkout from "./pages/Checkout/Checkout";
import { DeliveryProvider } from "./context/deliveryOptionContext";
import { DiscountProvider } from "./context/discountContext";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const header = <Header />;
  const nav = <Nav />;
  const menu = (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/w">
        <Route index element={<div>Gender</div>} />
        <Route path=":gender" element={<div>Gender</div>} />
        <Route path=":gender-:type" element={<div>Type</div>} />
        <Route path=":gender/:type/:category" element={<Products />} />
      </Route>
      <Route
        path="favorite"
        element={
          <RequireAuth>
            <Favorite />
          </RequireAuth>
        }
      />
      <Route path="checkout" element={<Checkout />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/product/:id" element={<Product />} />
      <Route
        path="admin-panel"
        element={
          <RequireAuth>
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
          </RequireAuth>
        }
      />
      <Route
        path="admin-panel/add-product"
        element={
          <RequireAuth>
            <RequireAdmin>
              <AddProduct />
            </RequireAdmin>
          </RequireAuth>
        }
      />
      <Route
        path="profile/*"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      >
        <Route path="" element={<ProfilePage />} />
        <Route path="my-data" element={<MyData />} />
        <Route path="cart" element />
        <Route path="orders" element />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
  const footer = <Footer />;
  return (
    <Router>
      <ErrorContext.Provider
        value={{
          error: state.error,
          setError: (error) => dispatch({ type: "error", error }),
        }}
      >
        <DiscountProvider>
          <CartContext.Provider
            value={{
              item: state.cart,
              login: (item) => dispatch({ type: "cart", item }),
            }}
          >
            <DeliveryProvider>
              <AuthContext.Provider
                value={{
                  user: state.user,
                  login: (user) => dispatch({ type: "login", user }),
                  logout: () => dispatch({ type: "logout" }),
                }}
              >
                <FavoriteContext.Provider
                  value={{
                    item: state.favorite,
                    setFavorite: (item) => dispatch({ type: "favorite", item }),
                  }}
                >
                  <FilterHandlerContext.Provider
                    value={{
                      open: state.open,
                      setOpen: (value) => dispatch({ type: "filter", value }),
                    }}
                  >
                    <Layout
                      header={header}
                      nav={nav}
                      menu={menu}
                      footer={footer}
                    />
                  </FilterHandlerContext.Provider>
                </FavoriteContext.Provider>
              </AuthContext.Provider>
            </DeliveryProvider>
          </CartContext.Provider>
        </DiscountProvider>
      </ErrorContext.Provider>
    </Router>
  );
}

export default App;
