import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { authContext } from '../../Provider/Provider';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const stripePromise = loadStripe(import.meta.env.VITE_PAYEMNT);

const DonationDetails = () => {
    const campaign = useLoaderData();
    const [showModal, setShowModal] = useState(false);
    const [recommendedCampaigns, setRecommendedCampaigns] = useState([]);
    const [axiosSecure] = UseAxiosSecure();

    useEffect(() => {
        const fetchRecommendedCampaigns = async () => {
            try {
                const response = await axiosSecure.get('/donation-campaigns');
                setRecommendedCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching recommended campaigns:', error);
            }
        };

        fetchRecommendedCampaigns();
    }, [axiosSecure]);

    return (
        <div className="container mx-auto p-4">
            {campaign && (
                <>
                    <h2 className="text-2xl mb-4">{campaign.petName}</h2>
                    <img src={campaign.image} alt={campaign.petName} className="w-[50%] mb-4 rounded" />
                    <p>{campaign.longDescription}</p>
                    <p>Maximum Donation Amount: ${campaign.maxDonationAmount}</p>
                    <p>Donated Amount: ${campaign.donatedAmount || 0}</p>
                    <button onClick={() => setShowModal(true)} className="btn btn-success mt-4">Donate Now</button>
                </>
            )}
            {showModal && (
                <Elements stripe={stripePromise}>
                    <DonationModal campaign={campaign} closeModal={() => setShowModal(false)} />
                </Elements>
            )}

          
        </div>
    );
};

const DonationModal = ({ campaign, closeModal }) => {
    const {user}=useContext(authContext)
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);
    const [axiosSecure] = UseAxiosSecure();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        try {
            const response = await axiosSecure.post('/create-payment-intent', {
                amount,
                campaignId: campaign._id,
                email: user?.email // replace 'currentUserId' with actual user id
            });

            const { clientSecret } = response.data;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName // replace with actual user name
                    }
                }
            });

            if (result.error) {
                console.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    toast.success('Donation successful!');
                    closeModal();
                    const donationData={
                        email:campaign.email,
                        userEmail:user?.email,
                        campaignID:campaign._id,
                        image:campaign.image,
                        transactionId:result.paymentIntent.id,
                        amount:parseFloat(amount)
                    }
                    axiosSecure.post('/donation-submit',donationData)
                    .then((data)=>{
                        console.log(data.data)
                    })
                }
            }
        } catch (error) {
            console.error('Error processing donation:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl mb-4">Donate to {campaign.petName}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Donation Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Credit Card</label>
                        <CardElement className="input input-bordered w-full" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="btn btn-secondary mr-2" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-success" disabled={!stripe}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonationDetails;
