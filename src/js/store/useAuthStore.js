import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoggedIn: false,
            isVenueManager: false,
            login: (name, email, avatar, banner, token, venueManager) => {
                if (!token) {
                    console.error("Feil: Ingen token mottatt fra API!");
                    return;
                }
            
                // Make sure token is properly formatted
                const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
                
                set({
                    user: { name, email, avatar, banner },
                    token: formattedToken,
                    isLoggedIn: true,
                    isVenueManager: !!venueManager,
                });
            
                console.log("Innlogging vellykket! Token lagret:", formattedToken);
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isLoggedIn: false,
                    isVenueManager: false,
                });
            },
            updateVenueManager: (venueManager) => {
                set({
                    isVenueManager : !!venueManager,
                });
            },
            updateAvatar: (newAvatar) => {
                set((state) => ({
                    user: state.user ? {...state.user, avatar: newAvatar} : null,
                }));
            },
            updateBanner: (newBanner) => {
                set((state)=> ({
                    user: state.user ? {...state.user, banner: newBanner} : null,
                }));
            },
        }),
        {
            name: "auth",
            getStorage: () => localStorage,
        },
    ),
);

export default useAuthStore;

// import { create } from "zustand";
// import { persist } from 'zustand/middleware'

// const useAuthStore = create(
//     persist(
//         (set) => ({
//             user: null,
//             token: null,
//             isLoggedIn: false,
//             isVenueManager: false,
//             login: (name, email, avatar, banner, token, venueManager) => {
//                 set({
//                     user: {name, email, avatar, banner},
//                     token,
//                     isLoggedIn: true,
//                     isVenueManager: !!venueManager,
//                 });
//             },
//             logout: () => {
//                 set({
//                     user: null,
//                     token: null,
//                     isLoggedIn: false,
//                     isVenueManager: false,
//                 });
//             },
//             updateVenueManager: (venueManager) => {
//                 set({
//                     isVenueManager : !!venueManager,
//                 });
//             },
//             updateAvatar: (newAvatar) => {
//                 set((state) => ({
//                     user: state.user ? {...state.user, avatar: newAvatar} : null,
//                 }));
//             },
//             updateBanner: (newBanner) => {
//                 set((state)=> ({
//                     user: state.user ? {...state.user, banner: newBanner} : null,
//                 }));
//             },
//         }),
//         {
//             name: "auth",
//         },
//     ),
// );

// export default useAuthStore;