import React, { Route, Routes } from "react-router-dom"
import { FC, Suspense, lazy } from "react";

const LandingPage = lazy(() => import("../pages/LandingPage"))
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"))

const RoutesComponent: FC = () => {
  return(
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><LandingPage /></Suspense>} />
      <Route path="/favorites" element={<Suspense fallback={<div>Loading...</div>}><FavoritesPage /></Suspense>} />
    </Routes>
  )
}

export default RoutesComponent;
