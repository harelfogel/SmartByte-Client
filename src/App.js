import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
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
import RoomDevices, { RoomDevicesWrapper } from "./containers/RoomsDashboard/RoomDevices/RoomDevices";
import { Notification } from "./components/Notification/Notification";
import { SuggestionsTable } from "./components/Suggestions/SuggestionsTable";
import Insights from "./containers/Insights/Insights";

import { getSuggestions } from "./components/Suggestions/suggestions.service";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("isAuthenticated") === "true" || false
  );
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );
  const [newSuggestionsCount, setNewSuggestionsCount] = useState(0);
  useEffect(() => {
    (async () => {
      const suggestions = await getSuggestions();
      const newSuggestions = suggestions.filter(({ is_new }) => is_new);
      console.log({suggestions,newSuggestions})
      setNewSuggestionsCount(newSuggestions.length);
    })()
  }, []);

  useEffect(() => {
    console.log({ newSuggestionsCount });
  }, [newSuggestionsCount]);

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
    <>
      {/* <Router> */}
      <Header
        user={user}
        onLogout={handleLogout}
        newSuggestionsCount={newSuggestionsCount}
      />
      <Notification
        setNewSuggestionsCount={setNewSuggestionsCount}
        newSuggestionsCount={newSuggestionsCount}
      />
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
        <Route
          path="/signup"
          element={<SignUp onSignUpSuccess={handleSignIn} />}
        />
        <Route
          path="/rooms-dashboard"
          element={
            isAuthenticated ? <RoomsDashboard /> : <Navigate to="/login" />
          }
        >
          <Route
            path="room/:id"
            element={
              isAuthenticated ? <RoomDevices /> : <Navigate to="/login" />
            }
          />
        </Route>
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
        <Route
          path="/room/:id"
          element={isAuthenticated ? <RoomDevices /> : <Navigate to="/login" />}
        />
        <Route
          path="/suggestions"
          element={
            isAuthenticated ? (
              <SuggestionsTable
                setNewSuggestionsCount={setNewSuggestionsCount}
                newSuggestionsCount={newSuggestionsCount}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/insights"
          element={isAuthenticated ? <Insights /> : <Navigate to="/login" />}
        />
      </Routes>
      {/* </Router> */}
    </>
  );
}

export default App;
