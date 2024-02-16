import React, { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage";
import Favorites from "../pages/Favorites";
import { FC } from "react";

const RoutesComponent: FC = () => {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  )
}

export default RoutesComponent;
