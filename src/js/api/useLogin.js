import { useState } from "react";
import { BASE_URL, LOGIN_URL, API_KEY } from "../constants";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (mailAddress, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}${LOGIN_URL}?_holidaze=true`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Noroff-API-Key": API_KEY,
                },
                body: JSON.stringify({ email: mailAddress, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.errors?.[0]?.message || "Login failed";
                throw new Error(errorMessage);
            }

            const { name, email, avatar, banner, accessToken, venueManager } = data.data;

            const user = {
                name,
                email,
                avatar,
                banner,
                token: accessToken,
                venueManager,
            };

            return user;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error
    };
};

export default useLogin;