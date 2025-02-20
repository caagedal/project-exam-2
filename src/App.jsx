import { Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/HomePage";
// import VenuesPage
// import VenuePage
// import login
// import profile
// import admin

export default function App(){

  return(
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element = {<Home />}/>
        </Route>
      </Routes>
    </>
  )

}
