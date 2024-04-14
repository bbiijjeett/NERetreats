import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import ListingsPage from "./pages/ListingsPage";
import Trip from "./pages/Trip";
import Wishlist from "./pages/Wishlist";
import Property from "./pages/Property";
import Reservation from "./pages/Reservation";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/properties/:listingId" element={<ListingDetails />} />
        <Route
          path="/properties/category/:category"
          element={<ListingsPage />}
        />
        <Route path="/:userId/trips" element={<Trip />} />
        <Route path="/:userId/wishlist" element={<Wishlist />} />
        <Route path="/:userId/properties" element={<Property />} />
        <Route path="/:userId/reservations" element={<Reservation />} />
      </Routes>
    </>
  );
};

export default App;
