import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tours from "../pages/Tours";
import TourDetail from "../pages/TourDetails";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import MyBookings from "../pages/MyBookings";
import AdminBookings from "../pages/AdminBookings";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/thank-you" element={<ThankYou />}></Route>
      <Route path="/tours" element={<Tours></Tours>}></Route>
      <Route path="/tours/:id" element={<TourDetail></TourDetail>}></Route>
      <Route
        path="/tours/search"
        element={<SearchResultList></SearchResultList>}
      ></Route>
      <Route path="/my-bookings" element={<MyBookings />}></Route>
      <Route path="/admin/bookings" element={<AdminBookings />}></Route>
    </Routes>
  );
};

export default Routers;
