import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.module.scss";
import RoomsDashboard from "./containers/RoomsDashboard/RoomsDashboard";
import WelcomeDashboard from "./containers/WelcomeDashboard/WelcomeDashboard";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import LocationDashboard from "./containers/LocationDashboard/LocationDashboard";
import RulesDashboard from "./containers/RulesDashboard/RulesDashboard";
import Header from "./containers/Header/Header";
import Cookies from "js-cookie";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("isAuthenticated") === "true" || false
  );
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );

  const handleSignIn = (token, userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    Cookies.set("isAuthenticated", true, { expires: 1 }); // 1 day expiration
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("isAuthenticated");
    Cookies.remove("user");
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/rooms-dashboard" replace />
            ) : (
              <WelcomeDashboard />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/rooms-dashboard" replace />
            ) : (
              <SignIn onSignInSuccess={handleSignIn} />
            )
          }
        />
        <Route path="/signup" element={<SignUp onSignUpSuccess={handleSignIn} />} />
        <Route
          path="/rooms-dashboard"
          element={
            isAuthenticated ? <RoomsDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/location"
          element={
            isAuthenticated ? <LocationDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/rules"
          element={
            isAuthenticated ? <RulesDashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
