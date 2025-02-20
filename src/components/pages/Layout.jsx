import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function Layout(){
    return(
        <div className="flex flex-col min-h-svh font-poppins flex-grow">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}