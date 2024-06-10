import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';


const DonatorsModal = ({ campaign, closeModal }) => {
    const [donators, setDonators] = useState({});
    const [axiosSecure] = UseAxiosSecure();

    useEffect(() => {
        const fetchDonators = async () => {
            try {
                const response = await axiosSecure.get(`/donation/${campaign._id}`);
                setDonators(response.data);
            } catch (error) {
                console.error('Error fetching donators:', error);
            }
        };

        fetchDonators();
    }, [axiosSecure, campaign]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl mb-4">Donators for {campaign.petName}</h2>
                <ul>

                        <li key={donators._id} className="mb-2">
                            <p>Email: {donators.email}</p>
                            <p>Amount: ${donators.maxDonationAmount}</p>
                        </li>
                  
                </ul>
                <button className="btn btn-secondary mt-4" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default DonatorsModal;
