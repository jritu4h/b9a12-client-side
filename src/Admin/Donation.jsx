import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';

const DonationCampaignsManagement = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [axiosSecure] = UseAxiosSecure();

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axiosSecure.get('/donation-campaigns');
                setCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, [axiosSecure]);

    const handleDelete = async (campaignId) => {
        try {
            const response = await axiosSecure.delete(`/donation/${campaignId}`);
            if (response.data.deletedCount >= 0) {
                alert('Campaign deleted successfully!');
                setCampaigns(campaigns.filter(campaign => campaign._id !== campaignId));
            }
        } catch (error) {
            console.error('Error deleting campaign:', error);
            alert('Error deleting campaign.');
        }
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Donation Campaigns Management</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Pet Image</th>
                        <th className="py-2 px-4 border-b">Pet Name</th>
                        <th className="py-2 px-4 border-b">Maximum Donation Amount</th>
                        <th className="py-2 px-4 border-b">Donated Amount</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(campaign => (
                        <tr key={campaign._id}>
                            <td className="py-2 px-4 border-b">
                                <img src={campaign.image} alt={campaign.petName} className="h-12 w-12 rounded" />
                            </td>
                            <td className="py-2 px-4 border-b">{campaign.petName}</td>
                            <td className="py-2 px-4 border-b">${campaign.maxDonationAmount}</td>
                            <td className="py-2 px-4 border-b">${campaign.donatedAmount || 0}</td>
                            <td className="py-2 px-4 border-b">
                              
                               <Link to={`/dashboard/edit-donation/${campaign._id}`}>
                               <button
                                   
                                   className="btn btn-secondary mr-2"
                               >
                                   Edit
                               </button>
                               </Link>
                                <button
                                    onClick={() => handleDelete(campaign._id)}
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

export default DonationCampaignsManagement;
