import React from "react";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </UserProvider>
  );
}

export default App;
