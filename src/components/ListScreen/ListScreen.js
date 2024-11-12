import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const ListScreen = () => {
    const { users } = useContext(UserContext);
    return (
        <div>
            <Navbar />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(item => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td><Link to={`/users/${item.id}/update`} className="link-offset-2 link-underline link-underline-opacity-0">Update</Link></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListScreen;
