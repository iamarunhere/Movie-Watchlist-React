import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from "./components/homePage/homePage";
import EditMovie from "./components/EditPage/EditPage";
import AddMovie from "./components/addMovie/addMovie";
import MovieDetails from "./components/movieDetails/movieDetailsPage";
import Navbar from "./components/navbar/navbar";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/editmovie/:id" element={<EditMovie />} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
