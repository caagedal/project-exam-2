import { Route, Routes } from "react-router-dom";
// import Layout
import Home from "./pages/HomePage";
// import VenuesPage
// import VenuePage
// import login
// import profile
// import admin

export default function App(){

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route></Route>
        </Route>
      </Routes>
    </div>
  )

}
