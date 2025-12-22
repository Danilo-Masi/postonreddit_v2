import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scheduled from "./pages/Scheduled";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Plans from "./pages/Plans";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

export default function App() {

  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicRoute><Login /></PublicRoute>} />
      <Route
        path="/registration"
        element={<PublicRoute><Registration /></PublicRoute>} />
      <Route
        path="/"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route
        path="/scheduled"
        element={<ProtectedRoute><Scheduled /></ProtectedRoute>} />
      <Route
        path="/settings"
        element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route
        path="/plans"
        element={<Plans />} />
    </Routes>
  )
}
