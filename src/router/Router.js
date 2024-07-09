import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggingOut(!currentUser && user !== null);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getClassNames = () => {
    if (isLoggingOut && location.pathname === '/login') {
      return 'fade';
    }
    return 'fade';
  };

  return (
    <div className="App">
      {user && <SideMenu />}
      <div className={user ? "main-content" : "auth-content"}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            classNames={getClassNames()}
            timeout={500}
            exit={!(isLoggingOut && location.pathname === '/login')}
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
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default AppRouter;
