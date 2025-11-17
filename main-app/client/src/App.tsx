import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scheduled from "./pages/Scheduled";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/scheduled" element={<Scheduled />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
