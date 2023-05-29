import React from "react";
import "materialize-css";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import Loader from "./components/Loader";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <div className="container">
        <ToastContainer />
        <BrowserRouter>{routes}</BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

