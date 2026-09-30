
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";

import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const user = localStorage.getItem("importhub_user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRouter = () => {
  const user = localStorage.getItem("importhub_user");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            user ? <Navigate to="/dashboard" replace /> : <SignUp />
          }
        />

        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate
              to={user ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={user ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

