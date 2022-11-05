import { useState } from "react";
import { Text } from "@mantine/core";
import Login from "./pages/Login";
import VideoBg from "./assets/video.mp4";
import Dashboard from "./layout/DashboardLayout";
import { ConnectWithAppPage } from "./pages/ConnectWithApp.jsx";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveLocation from "./components/dashboardSections/Live-location";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/connect-app" element={<ConnectWithAppPage />} />
        {isLoggedIn
          ? [
              <>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path={"/dashboard"} element={<Text>Dashboard</Text>} />
                  <Route
                    path={"/dashboard/live-location"}
                    element={<LiveLocation />}
                  />
                </Route>
              </>,
            ]
          : null}
      </Routes>
    </Router>
  );
}

export default App;
