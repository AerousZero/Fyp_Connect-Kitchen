import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../page/NotFound";
import ChefHomePage from "../page/Chef/HomePage";
import ClientHomepage from "../page/Client/Homepage";
import CreateJob from "../feature/Client/Jobs/CreateJob";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/chef/home" element={<ChefHomePage />} />
      <Route path="/client/home" element={<ClientHomepage />} />
       <Route path="/client/create-job" element={<CreateJob />} />
      {/* <Route path="/admin/home" element={<Admin />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
