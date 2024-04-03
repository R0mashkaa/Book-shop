import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Books from "./components/Books/Books";
import About from "./components/About";
import { AuthPage } from "./pages/AuthPage";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

export const useRoutes = (isAuthenticated) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [book, setBook] = useState([]);

  useEffect(() => {
    const filteredResults = book.filter((item) =>
      ((item.bookName).toLowerCase()).includes(search.toLowerCase())
      || ((item.author).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [book, search])

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/books" />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/books" element={<Books book={searchResults} setBook={setBook} search={search} setSearch={setSearch} />} />
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
