import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Books from "./components/Books/Books";
import About from "./components/About";
import { AuthPage } from "./pages/AuthPage";
import Home from "./pages/Home";

export const useRoutes = (isAuthenticated) => {

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/books"  />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/books"  element={<Books />} />        
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" exact />} />
    </Routes>
  );
};
