import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from ".";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../store/userSlice";

export const AppRouter = () => {
  const userDetails = useSelector(selectUserDetails);
  const isAuthenticated = userDetails.isAuthenticated;
  console.log(isAuthenticated, "isAuthencated");

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
