import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from '../Provider/Provider';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import GetPayment from '../Hooks/GetPayment';

const MyDonations = () => {
    const [donations] = GetPayment()
    const [axiosSecure] = UseAxiosSecure();
    const navigate = useNavigate();
    const {user}=useContext(authContext)
  console.log(donations)
    
    const handleRefund = async (donationId, amount, campaignID) => {
      
            await axiosSecure.delete(`/refund/${donationId}`);
            const response = await axiosSecure.patch(`/refundses/${campaignID}`, { amount: parseFloat(amount) });
            console.log(response.data);
            toast.success('Donation refunded successfully!');
        
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">My Donations</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Pet Image</th>
                        <th className="py-2 px-4 border-b">Donated Amount</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map(donation => (
                        <tr key={donation._id}>
                            <td className="py-2 px-4 border-b">
                                <img src={donation.image} alt={donation.petName} className="h-12 w-12 rounded" />
                            </td>
                            <td className="py-2 px-4 border-b">${donation.amount}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleRefund(donation._id,donation.amount,donation.campaignID)} className="btn btn-danger">Ask for Refund</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyDonations;
