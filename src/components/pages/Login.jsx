import React, { useState } from "react";
import useLogin from "../../js/api/useLogin";
import useAuthStore from "../../js/store/useAuthStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../js/validate/loginSchema";
import sanitizeMail from "../../js/utils/sanitize";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading } = useLogin();
    const { login: loginStore } = useAuthStore();
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        const sanitizedEmail = sanitizeMail(data.email);
        const sanitizedPassword = data.password.trim();

        try {
            const { name, email, avatar, banner, token, venueManager } = await login(
                sanitizedEmail,
                sanitizedPassword
            );

            loginStore(name, email, avatar, banner, token, venueManager);

            navigate("/");
            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <img
                        src="/logo-icon.svg"
                        alt="Holidaze logo icon"
                        className="h-12 w-auto"
                    />
                    <img
                        src="/logo-text.svg"
                        alt="Holidaze logo"
                        className="mt-4 h-8 w-auto"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                {error && (
                    <div className="mt-4 rounded-md bg-red-50 p-4 border border-red-400">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email")}
                                    className={`block w-full rounded-md border ${
                                        errors.email ? 'border-warning' : 'border-gray-300'
                                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-warning">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register("password")}
                                    className={`block w-full rounded-md border ${
                                        errors.password ? 'border-warning' : 'border-gray-300'
                                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-warning">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-main text-white ${
                            loading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}

// import { useState } from "react";
// import useLogin from "../../js/api/useLogin";
// import useAuthStore from "../../js/store/useAuthStore";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { loginSchema } from "../../js/validate/loginSchema";
// import sanitizeMail from "../../js/utils/sanitize";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Login() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { login, loading } = useLogin();
//     const { login: loginStore } = useAuthStore();
//     const [error, setError] = useState(null);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({ resolver: yupResolver(loginSchema) });

//     const onSubmit = async (data) => {
//         const sanitizedEmail = sanitizeMail(data.email);
//         const sanitizedPassword = data.password.trim();

//         try {
//             const { name, email, avatar, banner, token, venueManager } = await login(
//                 sanitizedEmail,
//                 sanitizedPassword
//             );

//             // Store user in Zustand 
//             loginStore(name, email, avatar, banner, token, venueManager);

//             // Redirect the user after login
//             if (location.pathname.includes("list-your-venue")) {
//                 navigate("/venue-hub/");
//             } else {
//                 navigate("/profile/" + name);
//             }
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
        
//         <div className="flex flex-col items-center justify-center text-neutral-dark">
//             <div className="flex flex-col justify-center align-middle">
//                 <img
//                     src="/logo-icon.svg"
//                     alt="Holidaze logo icon"
//                 />
//                 <img
//                     src="/logo-text.svg"
//                     alt="Holidaze logo"
//                 />
//             </div>
//             <h2>Sign in to your account</h2>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="email" className="">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className=""
//                             value={}
//                     </div>
//                 </form>                
//             </div>
//         </div>
//     );
// }
