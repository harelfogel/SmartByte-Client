import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import "./App.module.scss";
import Layout from "./hoc/Layout/Layout";
import RoomsDashboard from "./containers/RoomsDashboard/RoomsDashboard";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import RulesDashboard from "./containers/RulesDashboard/RulesDashboard";
import { LocationDashboard } from "./containers/LocationDashboard/LocationDashboard";

function App() {
  const AsyncRoomsDevices = asyncComponent(() =>
    import("./containers/RoomsDashboard/RoomDevices/RoomDevices")
  );
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/room/:id" element={<AsyncRoomsDevices />} />
          <Route path="/" element={<RoomsDashboard />} />
          <Route path="/rules" element={<RulesDashboard />} />
          <Route path="/location" element={<LocationDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
