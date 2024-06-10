import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const DonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const [axiosSecure]=UseAxiosSecure()

    const fetchCampaigns = async (page) => {
        try {
            const response = await axiosSecure.get(`/donation-campings?page=${page}&limit=10`);
            const data = await response.data;
            if (data.length > 0) {
                setCampaigns(data);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching donation campaigns:', error);
        }
    };

    const lastCampaignElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    useEffect(() => {
        fetchCampaigns(page);
    }, [page]);

    console.log(campaigns)
    return (
        <div className="container mx-auto py-24">
            <h2 className="text-2xl mb-4">Donation Campaigns</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                {campaigns.map((campaign, index) => (
                    <div
                        key={campaign._id}
                        className="card bg-white shadow-lg p-4 rounded"
                        ref={index === campaigns.length - 1 ? lastCampaignElementRef : null}
                    >
                        <img src={campaign.image} alt={campaign.petName} className="h-48 w-full object-cover mb-4 rounded" />
                        <h3 className="text-xl font-bold mb-2">{campaign.petName}</h3>
                        <p className="text-gray-700 mb-2">Maximum Donation Amount: ${campaign.maxDonationAmount}</p>
                        <p className="text-gray-700 mb-2">Donated Amount: ${campaign.donatedAmount || 0}</p>
                        <Link to={`/donation/${campaign._id}`} className="btn btn-success">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationCampaigns;
