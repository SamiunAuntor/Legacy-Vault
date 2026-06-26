import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const value = {};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}