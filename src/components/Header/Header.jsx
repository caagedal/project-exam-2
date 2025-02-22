import { NavLink } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import { useState } from "react";  // Remove useRef and useEffect
import DropdownMenu from "./DropdownMenu";
import { Menu } from "lucide-react";

/**
 * Header component
 * 
 * @component
 * @returns {JSX.Element} - The rendered header component
 */

function Header() {
    const { isLoggedIn } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMenuClick = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
        <header>
            <div className="flex justify-between items-center max-w-7xl p-2 align-middle mx-auto text-neutral-dark">
                <NavLink to="/">
                    <img
                        src="/full-logo.svg"
                        alt="Holidaze logo"
                    />
                </NavLink>

                {!isLoggedIn ? (
                    <div className="flex justify-center align-middle">
                        <NavLink to="/register" className="text-neutral-dark px-4 py-2">
                            Sign up
                        </NavLink>
                        <NavLink to="/login" className="bg-blue-600 text-white px-4 py-2 rounded bg-blue-main">
                            Login
                        </NavLink>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={handleMenuClick}
                            className="flex items-center space-x-2 bg-gray-700 text-neutral-dark px-4 py-2 rounded"
                            aria-label="Dropdown menu"
                            aria-expanded={isDropdownOpen}
                        >
                            <Menu className="text-neutral-dark text-2xl" />
                        </button>
                        <DropdownMenu 
                            isOpen={isDropdownOpen}
                            onClose={() => setIsDropdownOpen(false)}
                        />
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;