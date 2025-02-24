import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollTop";

export default function Layout(){
    return(
        <div className=" min-h-svh font-poppins flex-grow max-w-screen-2xl mx-auto">
            <ScrollToTop />
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}