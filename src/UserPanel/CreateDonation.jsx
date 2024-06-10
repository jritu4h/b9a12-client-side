import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { authContext } from '../Provider/Provider';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
const CreateDonationCampaign = () => {
   const imagekey= import.meta.env.VITE_IMAGEKEY
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const ImageApi=`https://api.imgbb.com/1/upload?key=${imagekey}`
    const [axiosSecure]=UseAxiosSecure()
      const navigate=useNavigate()
  const {user}=useContext(authContext)
  const onSubmit = (data) => {
    const formData= new FormData();
    formData.append('image',data.image[0])
    fetch(ImageApi,{
     method:"POST",
     body:formData
    })
    .then(res=>res.json())
    .then(imageResponse=> {
     console.log(imageResponse)
     if(imageResponse.success){
       const ImageUrl=imageResponse.data.display_url
       const {maxDonationAmount,lastDate,shortDescription,longDescription,name}=data
       const donationData={
        maxDonationAmount:parseFloat(maxDonationAmount),
        lastDate:lastDate,
        shortDescription:shortDescription,
        longDescription:longDescription,
         image:ImageUrl,
         email:user?.email,
         petName:name,
         donatedAmount:parseFloat(0)
       }
      console.log(donationData)
         axiosSecure.post(`/donation-camping`,donationData)
         .then(()=>{
           toast.success('success')
           navigate('/')
         })
     }
   })
  };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Create Donation Campaign</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Pet Picture</label>
                    <input type="file" {...register('image', { required: true })} className="input input-bordered w-full" />
                    {errors.petPicture && <p className="text-red-500 text-sm">Pet picture is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Maximum Donation Amount</label>
                    <input type="number" {...register('maxDonationAmount', { required: true })} className="input input-bordered w-full" />
                    {errors.maxDonationAmount && <p className="text-red-500 text-sm">Maximum donation amount is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Date of Donation</label>
                    <input type="date" {...register('lastDate', { required: true })} className="input input-bordered w-full" />
                    {errors.lastDate && <p className="text-red-500 text-sm">Last date of donation is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Short Description</label>
                    <input type="text" {...register('shortDescription', { required: true })} className="input input-bordered w-full" />
                    {errors.shortDescription && <p className="text-red-500 text-sm">Short description is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" />
                    {errors.shortDescription && <p className="text-red-500 text-sm">Short description is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Long Description</label>
                    <textarea {...register('longDescription', { required: true })} className="textarea textarea-bordered w-full"></textarea>
                    {errors.longDescription && <p className="text-red-500 text-sm">Long description is required.</p>}
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-success" >
                     Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDonationCampaign;
