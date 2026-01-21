import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scheduled from "./pages/Scheduled";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Plans from "./pages/Plans";
import GuardedRoute from "./routes/GuardedRoute";

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<GuardedRoute access="public"><Login /></GuardedRoute>} />
      <Route
        path="/registration"
        element={<GuardedRoute access="public"><Registration /></GuardedRoute>} />
      <Route
        path="/plans"
        element={<GuardedRoute access="plans"><Plans /></GuardedRoute>} />
      {/* TODO: Enable pro access for dashboard after testing
      <Route
        path="/"
        element={<Dashboard />} />
      <Route
        path="/settings"
        element={<Settings />} />
      <Route
        path="/scheduled"
        element={<Scheduled />} />
      */}
      <Route
        path="/"
        element={<GuardedRoute access="pro"><Dashboard /></GuardedRoute>} />
      <Route
        path="/"
        element={<Dashboard />} />
      <Route
        path="/scheduled"
        element={<GuardedRoute access="pro"><Scheduled /></GuardedRoute>} />
      <Route
        path="/settings"
        element={<GuardedRoute access="pro"><Settings /></GuardedRoute>} />
    </Routes>
  )
}
