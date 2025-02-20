import { NavLink } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

function Header() {
    const { isLoggedIn} = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header>
            <div className="flex justify-between align-middle w-7xl">
                <NavLink to="/">
                    <h1>Holidaze</h1>
                </NavLink>

                {/* User is NOT logged in */}
                {!isLoggedIn ? (
                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-neutral-dark bg-none"
                        >
                            Sign up
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-main text-white"
                        >
                            Login
                        </button>
                    </div>
                ) : (
                    /* User is logged in */
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className="flex items-center space-x-2"
                            aria-label="Dropdown menu"
                        >
                            Menu
                        </button>
                        {/* Pass props correctly */}
                        <DropdownMenu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
