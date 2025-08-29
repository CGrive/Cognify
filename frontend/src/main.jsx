// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";

// Material UI imports
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create dark theme similar to your index.css variables
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4db6ac" },   // teal (calm, modern accent)
    secondary: { main: "#ffb74d" }, // amber (warm highlight for buttons/alerts)
    background: {
      default: "#121212", // main app background
      paper: "#1e1e1e",   // cards / surfaces
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    divider: "rgba(255,255,255,0.12)",
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h5: { fontWeight: 700, color: "#fff" },
    h6: { fontWeight: 600, color: "#e0e0e0" },
    body2: { color: "#aaa" },
    button: { textTransform: "none", fontWeight: 600 }, // cleaner buttons
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#1e1e1e",
          boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#1a1a1a",
          color: "#fff",
          boxShadow: "0 1px 6px rgba(0,0,0,0.8)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a1a1a",
          color: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* applies background & text color globally */}
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
