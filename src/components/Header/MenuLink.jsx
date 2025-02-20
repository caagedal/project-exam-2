import { NavLink } from "react-router-dom";

export default function MenuLink({ to, label, onClose }) {
    return (
        <li>
            <NavLink
                to={`/${to}`}
                onClick={onClose}
                className="block px-4 py-2 hover:bg-gray-200"
            >
                {label}
            </NavLink>
        </li>
    );
}


// import { NavLink } from "react-router-dom";

// export default function MenuLink({to, label, onClose}) {
//     const handleClick = () => {
//         onClose();
//     };

//     return(
//         <li className="">
//             <NavLink
//                 to={`/${to}`}
//                 onClick={handleClick}
//                 className=""
//             >
//                 {label}
//             </NavLink>
//         </li>
//     );
// }

