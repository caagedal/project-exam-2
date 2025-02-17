import { useState } from "react";
import { BASE_URL, LOGIN_URL, API_KEY } from "../constants";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    
    const login = async (mailAddress, password) => {
        setLoading(true);

        try{
            const response = await fetch (`${BASE_URL}${LOGIN_URL}?_holidaze=true`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Noroff-API-Key": API_KEY,
                },
                body: JSON.stringify({email: mailAddress, password}),
            });

            if (!response.ok){
                
            }
        }
    }
}