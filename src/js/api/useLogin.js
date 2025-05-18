import { useState } from 'react';
import { BASE_URL, LOGIN_URL, API_KEY } from '../constants';

/**
 * Custom hook for handling user login via API.
 * Provides login function and loading/error state.
 *
 * @returns {{
 *   login: (email: string, password: string) => Promise<{ name: string, email: string, avatar: string, banner: string, token: string, venueManager: boolean }>;
 *   loading: boolean;
 *   error: string|null;
 * }}
 */
export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Performs user login request.
   * @param {string} email - User email address.
   * @param {string} password - User password.
   * @returns {Promise<Object>} Resolves to user data on success.
   * @throws {Error} Throws if login fails.
   */
  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}${LOGIN_URL}?_holidaze=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': API_KEY,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const message = result.errors?.[0]?.message || 'Login failed';
        throw new Error(message);
      }

      const { name, email: userEmail, avatar, banner, accessToken, venueManager } = result.data;

      return {
        name,
        email: userEmail,
        avatar,
        banner,
        token: accessToken,
        venueManager,
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}