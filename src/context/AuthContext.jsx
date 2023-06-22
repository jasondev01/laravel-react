import { createContext, useContext, useEffect, useState } from 'react';
// import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const csrf = () => fetch('/sanctum/csrf-cookie');

    const getUser = async () => {
        try {
            const response = await fetch('/api/user');
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                throw new Error('Failed to get user');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const login = async ({ ...data }) => { // email, password
        await csrf();
        setErrors([]);
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.ok) {
                await getUser();
                navigate('/');
            } else if (response.status === 422) {
                const errorData = await response.json();
                setErrors(errorData.errors);
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const register = async ({ ...data }) => { // name, email, password, password_confirmation
        await csrf();
        setErrors([]);
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.ok) {
                await getUser();
                navigate('/');
            } else if (response.status === 422) {
                const errorData = await response.json();
                setErrors(errorData.errors);
            } else {
                throw new Error('Failed to register');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        fetch('/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(() => {
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, errors, getUser, login, register, logout, csrf }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuthContext() {
    return useContext(AuthContext)
}