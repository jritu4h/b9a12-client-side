import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import GetUser from '../Hooks/GetUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UsersManagement = () => {
    const [users,refetch] = GetUser()
    const [axiosSecure] = UseAxiosSecure();

   

    const handleMakeAdmin = async (userId) => {
     
             axiosSecure.patch(`/user/${userId}`,{role:'admin'})
             .then(()=>{
                toast.success('success')
                refetch()
            }).catch((error)=>{
                console.error('Error promoting user to admin:', error);
                toast.error('Error promoting user to admin.');
            })

      
          
       
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Users Management</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Profile Picture</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">
                                <img src={user.image} alt={user.name} className="h-12 w-12 rounded" />
                            </td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.role || 'user'}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleMakeAdmin(user._id)}
                                    className="btn btn-primary mr-2"
                                    disabled={user.role === 'admin'}
                                >
                                    Make Admin
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersManagement;
