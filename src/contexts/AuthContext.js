import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        loggedIn: false,
        isAdmin: false,
        username: null
    });

    useEffect(() => {
        // 세션 기반 로그인 여부 확인
        const checkSession = async () => {
            try {
                const res = await api.get('/api/user/data'); // or /api/auth/check
                const { isAdmin, username } = res.data;

                setUser({
                    loggedIn: true,
                    isAdmin: !!isAdmin,
                    username: username || null
                });
            } catch (err) {
                console.log('User is not logged in:', err.message);
                setUser({
                    loggedIn: false,
                    isAdmin: false,
                    username: null
                });
            }
        };

        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
