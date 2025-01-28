import { Outlet } from "react-router-dom";
// import footer
// import header

export function Layout(){

    return(
        <div>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );

}

