import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scheduled from "./pages/Scheduled";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Plans from "./pages/Plans";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/scheduled" element={<Scheduled />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/plans" element={<Plans />}/>
    </Routes>
  )
}
