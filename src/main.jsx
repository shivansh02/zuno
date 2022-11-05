import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider
    theme={{ colorScheme: "light" }}
    withGlobalStyles
    withNormalizeCSS
  >
    <App />
  </MantineProvider>
);
