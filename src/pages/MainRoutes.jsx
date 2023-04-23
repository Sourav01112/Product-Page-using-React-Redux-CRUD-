import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./Admin";
import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { PrivateRoute } from "../components/PrivateRoute";
import { EditPage } from "./EditPage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/add-product"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="edit/:id"
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};
