import MenuLink from "./MenuLink";
import { useRef, useEffect } from "react";
import useAuthStore from "../../js/store/useAuthStore";

export default function DropdownMenu({ isOpen, onClose }) {
    const { user, isVenueManager, logout } = useAuthStore();
    const menuRef = useRef(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]); // Depend on isOpen to add/remove listener

    return (
        isOpen && (
            <div ref={menuRef} className="absolute top-full right-0 bg-white shadow-md p-4 rounded">
                <nav>
                    <ul>
                        <MenuLink to={`profile/${user?.name}`} label="Profile" onClose={onClose} />
                        <MenuLink to={`profile/${user?.name}/bookings`} label="My Bookings" onClose={onClose} />
                        {isVenueManager && (
                            <MenuLink to={`profile/${user?.name}/venue-manager`} label="Manager Dashboard" onClose={onClose} />
                        )}
                        <li>
                            <button onClick={logout} className="text-red-600 hover:text-red-800 font-semibold">
                                Log out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    );
}


// import MenuLink from "./MenuLink";
// import { useState, useRef, useEffect } from "react";
// import useAuthStore from "../../js/store/useAuthStore";

// export default function DropdownMenu(isOpen, onClose){
//     const {user, isVenueManager, logout} = useAuthStore();
//     const [isOpen, setIsOpen] = useState(false);
//     const menuRef = useRef(null);

//     const handleClose = () => {
//         setIsOpen(false);
//     };

//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (menuRef.current && !menuRef.current.contains(e.target)) {
//                 handleClose();
//             }
//         } if (isOpen){
//             document.addEventListener("mousedown", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div className="relative">
//             {isOpen && (
//                 <nav className="">
//                     <ul>
//                         <MenuLink
//                             to={`profile/${user.name}`}
//                             title="Profile"
//                             onClose={handleClose}
//                         />
//                         <MenuLink
//                             to={`profile/${user.name}/bookings`}
//                             title="My Bookings"
//                             onClose={handleClose}
//                         />
//                         {isVenueManager && (
//                             <MenuLink
//                                 to={`profile/${user.name}/venue-manager`}
//                                 title="Manager Dashboard"
//                                 onClose={handleClose}
//                             />
//                         )}
//                         <li className="">
//                             <button
//                                 onClick={logout}
//                                 className="">
//                                     Log out
//                                 </button>
//                         </li>
//                     </ul>
//                 </nav>
//             )}
//         </div>
//     )
// }