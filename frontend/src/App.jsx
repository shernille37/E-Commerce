import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container } from "react-bootstrap";

import Header from "./components/Header";
import NotFound from "./components/NotFound";

import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/checkout/ShippingScreen";
import PaymentScreen from "./screens/checkout/PaymentScreen";
import PlaceOrderScreen from "./screens/checkout/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import CheckOut from "./screens/checkout/CheckOut";
import OrderListScreen from "./screens/admin/OrderListScreen";
import AdminScreen from "./screens/admin/AdminScreen";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
