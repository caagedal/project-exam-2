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
        <header className="bg-[var(--color-white)] ">
            <div className="flex justify-between items-center max-w-screen-2xl py-4 px-4 align-middle mx-auto text-[var(--color-neutral-dark)]">
                <NavLink to="/">
                    <img
                        src="/full-logo.svg"
                        alt="Holidaze logo"
                        className="h-15"
                    />
                </NavLink>

                {!isLoggedIn ? (
                    <div className="flex justify-center align-middle">
                        <NavLink to="/register" className="text-[var(--color-neutral-dark)] px-4 py-2">
                            Sign up
                        </NavLink>
                        <NavLink to="/login" className="bg-[var(--color-blue-main)] text-[var(--color-white)] px-4 py-2 rounded">
                            Login
                        </NavLink>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={handleMenuClick}
                            className="flex items-center space-x-2 bg-[var(--color-neutral-dark)] text-[var(--color-white)] px-4 py-2 rounded"
                            aria-label="Dropdown menu"
                            aria-expanded={isDropdownOpen}
                        >
                            <Menu className="text-[var(--color-white)] text-2xl" />
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