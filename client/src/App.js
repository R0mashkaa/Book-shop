import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import Loader from "./components/Loader";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }
 console.log("AppJs", isAuthenticated)
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <div className="container">
        <BrowserRouter>{routes}</BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

