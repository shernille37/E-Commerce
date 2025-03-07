import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";

import Header from "./components/Header";
import NotFound from "./components/NotFound";

import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />

      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
