import React, { useState, useEffect, useContext } from 'react';

import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { authContext } from '../Provider/Provider';
import DonatorsModal from './DonationModel';
import { Link } from 'react-router-dom';

// import DonatorsModal from './DonatorsModal'; // Modal component for viewing donators

const DonationManage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [showDonatorsModal, setShowDonatorsModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [axiosSecure] = UseAxiosSecure();
      const {user}=useContext(authContext)
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axiosSecure.get(`/my-donation?email=${user?.email}`);
                setCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, [axiosSecure,user]);


    const handleViewDonators = (campaign) => {
        setSelectedCampaign(campaign);
        setShowDonatorsModal(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">My Donation Campaigns</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Maximum Donation Amount</th>
                        <th>Donation Progress</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(campaign => (
                        <tr key={campaign._id}>
                            <td>{campaign.petName}</td>
                            <td>${campaign.maxDonationAmount}</td>
                            <td>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(campaign.donatedAmount / campaign.maxDonationAmount) * 100}%` }}></div>
                                </div>
                            </td>
                            <td>
                             
                                <Link to={`/dashboard/edit-donation/${campaign._id}`} className="btn btn-primary mr-2">Edit</Link>
                                <button className="btn btn-info" onClick={() => handleViewDonators(campaign)}>View Donators</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showDonatorsModal && (
                <DonatorsModal campaign={selectedCampaign} closeModal={() => setShowDonatorsModal(false)} />
            )}
        </div>
    );
};

export default DonationManage;
