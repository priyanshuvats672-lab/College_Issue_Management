import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { loginApi, logoutApi, getCurrentUserApi, registerApi } from "../api/auth.api";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (userData) => {
        // call login API
        try {
            const response = await loginApi(userData);
            localStorage.setItem('accessToken', response.data.accessToken);
            setUser(response.data.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
        } finally {
            localStorage.removeItem("accessToken");
            setUser(null);
        }
    };

    const getCurrentUser = async () => {
        try {
            const response = await getCurrentUserApi();
            setUser(response.data.user);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
    async function loadUser() {
        try {
            await getCurrentUser();
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    loadUser();
}, []);

    const register = async (userData) => {
        try {
            const response = await registerApi(userData);
            localStorage.setItem('accessToken', response.data.accessToken);
            setUser(response.data.user);
        } catch (error) {
            throw error;
        }
    };

        return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;