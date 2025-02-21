import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "../../js/store/useAuthStore";
import useRegister from "../../js/api/useRegister";
import { registerSchema } from "../../js/validate/registerSchema";

export default function Register() {
    const navigate = useNavigate();
    const { register: registerUser, loading, error } = useRegister();
    const { login: loginStore } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            avatar: "",
            venueManager: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            const { name, email, avatar, banner, token, venueManager } = await registerUser(data);
            loginStore(name, email, avatar, banner, token, venueManager);
            navigate("/");
        } catch (err) {
            // Error is already handled by the hook
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4">
            <div className="w-full max-w-md space-y-8">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Create an Account
                </h2>

                {error && (
                    <div className="mt-4 rounded-md bg-red-50 p-4 border border-red-400">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            {...register("name")}
                            className={`block w-full rounded-md border ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2`}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className={`block w-full rounded-md border ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password")}
                            className={`block w-full rounded-md border ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2`}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Avatar URL (optional)
                        </label>
                        <input
                            {...register("avatar")}
                            type="url"
                            className={`block w-full rounded-md border ${
                                errors.avatar ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2`}
                        />
                        {errors.avatar && (
                            <p className="text-sm text-red-600">{errors.avatar.message}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            {...register("venueManager")}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Register as a Venue Manager (or do it later through your profile)
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-blue-main ${
                            loading 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}