import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import ExcelFormulaHelper from '../components/ExcelFormulaHelper';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Settings from '../components/Settings';
import { auth } from '../firebaseConfig';
import SideMenu from '../components/SideMenu';
import '../router/Transitions.css'; // Adjust the path as needed

const AppRouter = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {user && <SideMenu />}
      <div className={user ? "main-content" : "auth-content"}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Routes location={location}>
              <Route
                path="/login"
                element={
                  !user ? (
                    <div className="auth-container">
                      {showLogin ? (
                        <Login setShowLogin={setShowLogin} setUser={setUser} />
                      ) : (
                        <Signup setShowLogin={setShowLogin} setUser={setUser} />
                      )}
                    </div>
                  ) : (
                    <Navigate to="/excel-helper" />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  !user ? (
                    <div className="auth-container">
                      {showLogin ? (
                        <Login setShowLogin={setShowLogin} setUser={setUser} />
                      ) : (
                        <Signup setShowLogin={setShowLogin} setUser={setUser} />
                      )}
                    </div>
                  ) : (
                    <Navigate to="/excel-helper" />
                  )
                }
              />
              <Route path="/settings" element={user ? <Settings user={user} /> : <Navigate to="/login" />} />
              <Route path="/excel-helper" element={user ? <ExcelFormulaHelper /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to={user ? "/excel-helper" : "/login"} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppRouter;
