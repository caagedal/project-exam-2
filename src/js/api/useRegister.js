import { useState, useCallback } from "react";
import { BASE_URL, REGISTER_URL, API_KEY } from "../constants";

/**
 * Custom hook for handling user registration.
 * 
 * @returns {Object} Registration functions and state
 */
export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = useCallback(async (data) => {
        const { name, email, password, avatar, venueManager } = data;
        const url = `${BASE_URL}${REGISTER_URL}`;
        
        // Convert avatar string URL to required object format
        const avatarObject = avatar ? {
            url: avatar,
            alt: `${name}'s profile picture`
        } : {
            url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Manila_dwarf_coconut_palm.jpg",
            alt: "default profile picture"
        };

        const requestBody = {
            name,
            email,
            password,
            avatar: avatarObject,
            venueManager: Boolean(venueManager)
        };

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Noroff-API-Key": API_KEY
                },
                body: JSON.stringify(requestBody)
            });

            const responseData = await response.json();

            if (!response.ok) {
                const errorMessage = 
                    responseData?.errors?.[0]?.message || 
                    responseData?.message || 
                    "Registration failed";
                    
                throw new Error(errorMessage);
            }

            return responseData;

        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { register, loading, error };
}

export default useRegister;