import { Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/HomePage";
import VenuePage from "./components/pages/VenuePage";
import Login from "./components/pages/Login";
import Register from "./components/pages/register";
import ProfilePage from "./components/pages/profile/Profile";
import VenueManagerDashboard from "./components/pages/venueManager/VenueManagerDashboard";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route path="venues/:venueID" element={<VenuePage />} />
      <Route path="profile/:username/venue-manager" element={<VenueManagerDashboard />} />
      </Route>

    </Routes>
  );
}
