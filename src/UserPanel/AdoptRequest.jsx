import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../Provider/Provider';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetReq from '../Hooks/GetReq';
const AdoptionRequests = () => {
   const [adoptionRequests]=GetReq()
    const [axiosSecure] = UseAxiosSecure()
   

    const handleStatusChange = async (id, petId) => {
        axiosSecure.patch(`/requestUpdate/${id}`, { status: 'Accepted' })
            .then(() => {
                toast.success('success')
                axiosSecure.patch(`/pet/${petId}`, { status: 'Adopted' })
                    .then((data) => {
                        console.log(data.data)
                    })
            })
    };
    const handelReaject = async (id, petId) => {
        axiosSecure.patch(`/requestUpdate/${id}`, { status: 'Rejected' })
            .then(() => {
                toast.success('Rejected')
            })
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Adoption Requests</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Pet Name</th>
                        <th className="py-2">Requester Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Phone</th>
                        <th className="py-2">Address</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adoptionRequests.map(request => (
                        <tr key={request._id}>
                            <td className="py-2">{request.petName}</td>
                            <td className="py-2">{request.userName}</td>
                            <td className="py-2">{request.userEmail}</td>
                            <td className="py-2">{request.userPhone}</td>
                            <td className="py-2">{request.userAddress}</td>
                            <td className="py-2">{request.status}</td>
                            <td className="py-2">
                                {
                                    request.status === 'Accepted' ? <button
                                        className="btn btn-success mr-2 white"
                                    >
                                        Accepted
                                    </button> : <button disabled={request.status === 'Rejected'}
                                        className="btn btn-success mr-2"
                                        onClick={() => handleStatusChange(request._id, request.petId)}
                                    >
                                        Accept
                                    </button>
                                }
                                {request.status === 'Rejected' ? <button className="btn btn-danger">
                                    Rejected
                                </button> : <button
                                    disabled={request.status === 'Accepted'}
                                    className="btn btn-danger"
                                    onClick={() => handelReaject(request._id, 'Rejected')}
                                >
                                    Reject
                                </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdoptionRequests;
