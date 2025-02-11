import { NavLink } from "react-router-dom";

export function Header(){

    return (
        <header>
            <nav>
                <NavLink to = "/"><p className="logo text-5xl">Holidaze</p></NavLink>
                <div className="nav-links">
                    
                    <NavLink to = "/Login"><p>Login</p></NavLink>
                </div>                
            </nav>
        </header>
    )

}