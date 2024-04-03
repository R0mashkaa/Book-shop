import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import Loader from './components/Loader';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';
// import AdPopup from './components/Ad/AdPopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAdOpen, setIsAdOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAdOpen(true);
    }, 5000);
    const closeAd = () => setIsAdOpen(false);
    window.addEventListener('beforeunload', closeAd);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', closeAd);
    };
  }, []);

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
        {/* <AdPopup isOpen={isAdOpen} onClose={() => setIsAdOpen(false)} /> */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
