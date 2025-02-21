import { Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/HomePage";
// import VenuesPage
// import VenuePage
import Login from "./components/pages/Login";
import Register from "./components/pages/register";
import ProfilePage from "./components/pages/profile";
// import admin

export default function App(){

  return(
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element = {<Home />}/>
          <Route path="login" element = {<Login />}/>
          <Route path="register" element = {<Register/>}/>
          <Route path="profile/:username" element = {<ProfilePage/>}/>
        </Route>
      </Routes>
    </>
  )

}
