import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * AuthStore holds authentication state and actions for user login/logout and profile updates.
 * Persistence is enabled under the key 'auth'.
 *
 * @typedef {Object} UserProfile
 * @property {string} name
 * @property {string} email
 * @property {string} avatar
 * @property {string} banner
 * @property {string} [bio]
 *
 * @typedef {Object} AuthStore
 * @property {UserProfile|null} user
 * @property {string|null} token
 * @property {boolean} isLoggedIn
 * @property {boolean} isVenueManager
 * @property {(name: string, email: string, avatar: string, banner: string, token: string, venueManager: boolean) => void} login
 * @property {() => void} logout
 * @property {(venueManager: boolean) => void} updateVenueManager
 * @property {(newAvatar: string) => void} updateAvatar
 * @property {(newBanner: string) => void} updateBanner
 * @property {(bio: string) => void} updateBio
 */

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isVenueManager: false,

      /**
       * Logs in a user by setting profile and token.
       */
      login: (name, email, avatar, banner, token, venueManager) => {
        set({
          user: { name, email, avatar, banner },
          token,
          isLoggedIn: true,
          isVenueManager: Boolean(venueManager),
        });
      },

      /**
       * Logs out the current user and resets auth state.
       */
      logout: () => {
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          isVenueManager: false,
        });
      },

      /**
       * Updates the venue manager flag for the user.
       */
      updateVenueManager: (venueManager) => {
        set({ isVenueManager: Boolean(venueManager) });
      },

      /**
       * Updates the user's avatar URL.
       */
      updateAvatar: (newAvatar) => {
        set((state) => ({
          user: state.user ? { ...state.user, avatar: newAvatar } : null,
        }));
      },

      /**
       * Updates the user's banner image URL.
       */
      updateBanner: (newBanner) => {
        set((state) => ({
          user: state.user ? { ...state.user, banner: newBanner } : null,
        }));
      },

      /**
       * Updates the user's bio text.
       */
      updateBio: (bio) => {
        set((state) => ({
          user: state.user ? { ...state.user, bio } : null,
        }));
      },
    }),
    { name: 'auth' }
  )
);

export default useAuthStore;
