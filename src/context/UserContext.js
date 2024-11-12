import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { saveToken, getToken } from "../utils/auth"; 

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const isAuthenticated = () => {
        return !!getToken(); 
    }

    const LoginUser = async (user) => {
        try {
            const response = await axios.post(`http://localhost:3005/api/users/login`, { 
                email: user.email, 
                password: user.password 
            });
            saveToken(response.data.token);
        } catch (error) {
            console.log(error);
        }
    };

    const RegisterUser = async (user) => {
        try {
            const response = await axios.post(`http://localhost:3005/api/users/register`, { 
                email: user.email, 
                password: user.password 
            });
            saveToken(response.data.token)
        } catch (error) {
            console.log(error);
        }
    };

    const UpdateUser = async (user, id) => {
        try {
            const response = await axios.put(`http://localhost:3005/api/users/update/${id}`, { 
                email: user.email, 
                password: user.password 
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:3005/api/users/');
            console.log(response)
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ 
            users, 
            LoginUser, 
            RegisterUser, 
            UpdateUser, 
            isAuthenticated
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
