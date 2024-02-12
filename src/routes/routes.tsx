import { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage";
import Favourites from "../pages/Favourites";
import { FC } from "react";

const RoutesComponent: FC = () => {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  )
}

export default RoutesComponent;
