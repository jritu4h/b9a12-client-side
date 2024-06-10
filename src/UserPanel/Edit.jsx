import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import SetAdmin from '../Hooks/SetAdmin';

const Edit = () => {
    const datas=useLoaderData()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
      const navigate=useNavigate()
      const [axiosSecure]=UseAxiosSecure()
      const [isAdmin]=SetAdmin()
  const onSubmit = (data) => {
    
  console.log(data)
  axiosSecure.patch(`/donationupdate/${datas._id}`,{maxDonationAmount:data.maxDonationAmount})
  .then(()=>{
    isAdmin?navigate('/dashboard/all-donation'):navigate('/dashboard/my-donation-camping')
  })
  };
    return (
        <div>
           <form onSubmit={handleSubmit(onSubmit)}>
           <div className="mb-4">
                    <label className="block text-gray-700">Maximum Donation Amount</label>
                    <input defaultValue={datas.maxDonationAmount} type="number" {...register('maxDonationAmount', { required: true })} className="input input-bordered w-full" />
                    {errors.maxDonationAmount && <p className="text-red-500 text-sm">Maximum donation amount is required.</p>}
                </div>
                <button className='btn btn-primary'>Update Ammount</button>
           </form>
        </div>
    );
};

export default Edit;