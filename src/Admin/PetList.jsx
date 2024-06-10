import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';
import GetPets from '../Hooks/GetPets';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PetsManagement = () => {
    const [axiosSecure] = UseAxiosSecure();
    const [getpet,refetch] = GetPets();
  

    const handleDelete = async (petId) => {
        try {
            const response = await axiosSecure.delete(`/pet/${petId}`);
            if (response.data.deletedCount >= 0) {
                toast.success('Pet deleted successfully!');
                refetch()
            }
        } catch (error) {
            console.error('Error deleting pet:', error);
            alert('Error deleting pet.');
        }
    };

   
    const handleChangeStatus = async (petId, status) => {
        try {
            const response = await axiosSecure.patch(`/pet/${petId}`, { status:'Adopted' });
            if (response.data.modifiedCount >= 0) {
                toast.success('Pet status updated successfully!');
               refetch()
            }
        } catch (error) {
            console.error('Error changing pet status:', error);
            alert('Error changing pet status.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Pets Management</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Profile Picture</th>
                        <th className="py-2 px-4 border-b">Pet Name</th>
                        <th className="py-2 px-4 border-b">Owner Name</th>
                        <th className="py-2 px-4 border-b">Owner Email</th>
                        <th className="py-2 px-4 border-b">Adopted</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getpet.map(pet => (
                        <tr key={pet._id}>
                            <td className="py-2 px-4 border-b">
                                <img src={pet.image} alt={pet.name} className="h-12 w-12 rounded" />
                            </td>
                            <td className="py-2 px-4 border-b">{pet.petName}</td>
                            <td className="py-2 px-4 border-b">{pet.name}</td>
                            <td className="py-2 px-4 border-b">{pet.email}</td>
                            <td className="py-2 px-4 border-b">{pet.status==='Adopted' ? 'Yes' : 'No'}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleChangeStatus(pet._id)}
                                    className="btn btn-primary mr-2"
                                    disabled={pet.status==='Adopted'}
                                >
                                    {pet.status!=='Adopted' ? 'Mark as Not Adopted' : 'Mark as Adopted'}
                                </button>
                              <Link to={`/dashboard/update/${pet._id}`}>
                              <button
                                  
                                  className="btn btn-secondary mr-2"
                              >
                                  Edit
                              </button>
                              </Link>
                                <button
                                    onClick={() => handleDelete(pet._id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PetsManagement;
