// App.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public layout shows Navbar + Footer
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Private app routes (NO public Navbar/Footer here) */}
      <Route path="/app/dashboard" element={<Dashboard />} />
      <Route path="/app/editor" element={<Editor />} />
      <Route path="/app/editor/:id" element={<Editor />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
