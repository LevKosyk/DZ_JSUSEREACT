import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { saveToken, getToken } from '../utils/auth';
import { User } from '../users';

interface UserContextType {
    users: User[];
    LoginUser: (user: User) => Promise<void>;
    RegisterUser: (user: User) => Promise<void>;
    UpdateUser: (user: User, id: number) => Promise<void>;
    fetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {
        const token = getToken();
        if (token) {
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get<User[]>('http://localhost:3005/api/users/');
            setUsers(response.data);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const LoginUser = async (user: User) => {
        try {
            const response = await fetch('http://localhost:3005/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            saveToken(data.token); 
            axios.defaults.headers['Authorization'] = `Bearer ${data.token}`;
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const RegisterUser = async (user: User) => {
        try {
            const response = await fetch('http://localhost:3005/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            setUsers([...users, data]);
            saveToken(data.token);
            axios.defaults.headers['Authorization'] = `Bearer ${data.token}`;
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const UpdateUser = async (user: User, id: number) => {
        try {
            const response = await axios.put(`http://localhost:3005/api/users/update/${id}`, {
                email: user.email,
                password: user.password,
            });
            console.log("User updated:", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <UserContext.Provider value={{ users, LoginUser, RegisterUser, UpdateUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};
