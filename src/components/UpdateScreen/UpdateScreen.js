import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from "react-router-dom";

const UpdateScreen = () => {
    const { id } = useParams(); // Получение id из URL
    const { UpdateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fetch user data when component mounts to populate the form
    useEffect(() => {
        // Здесь можно добавить код для получения данных пользователя, если нужно
        // Например, можно запросить данные пользователя с серверной части, чтобы отобразить текущие email и password
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        const user = { email, password };
        UpdateUser(user, id);  // Отправка обновленных данных на сервер
        setEmail('');
        setPassword('');
        navigate("/users");  // Перенаправление на страницу пользователей после успешного обновления
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Update</h2>
                        <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateScreen;
