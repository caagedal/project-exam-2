import MenuLink from "./MenuLink";
import { useRef, useEffect } from "react";
import useAuthStore from "../../js/store/useAuthStore";


/**
 * DropdownMenu component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Determines if the dropdown is open
 * @param {Function} props.onClose - Function to close the dropdown
 * @returns {JSX.Element | null} - The rendered dropdown menu or null if closed
 */

export default function DropdownMenu({ isOpen, onClose }) {
    const { user, isVenueManager, logout } = useAuthStore();
    const menuRef = useRef(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            // Check if the click target is the toggle button
            const isToggleButton = event.target.closest('button[aria-label="Dropdown menu"]');
            
            if (menuRef.current && !menuRef.current.contains(event.target) && !isToggleButton) {
                onClose();
            }
        }
    
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]); 

    const handleLogout = () => {
        logout();
        onClose(); // Close the dropdown after logout
    };

    return (
        isOpen && (
            <div 
                ref={menuRef} 
                className="absolute top-full right-0 bg-white shadow-md p-4 rounded z-50 mt-2 min-w-[200px] text-neutral-dark"
            >
                <nav>
                    <ul className="space-y-2">
                        <MenuLink to={"/"} label="Home" onClose={onClose} />
                        <MenuLink to={`/profile/${user?.name}`} label="Profile" onClose={onClose} />
                        {isVenueManager && (
                            <MenuLink 
                                to={`/profile/${user?.name}/venue-manager`} 
                                label="Manager Dashboard" 
                                onClose={onClose} 
                            />
                        )}
                        <li>
                            <button 
                                onClick={handleLogout} 
                                className="w-full text-left px-4 py-2 text-red-600 hover:text-red-800 hover:bg-gray-50 rounded font-semibold"
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    );
}