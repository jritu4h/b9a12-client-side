import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const AdoptModal = ({ pet, user, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [axiosSecure]=UseAxiosSecure()
    const onSubmit = async (data) => {
        const adoptionData = {
            petId: pet._id,
            petName: pet.petName,
            petImage: pet.image,
            userName: user.displayName,
            userEmail: user.email,
            userPhone: data.phone,
            userAddress: data.address,
            email:pet.email,
            status:'Pending'
        };
        
        axiosSecure.post('/request',adoptionData).then(()=>{
            toast.success('success')
        })
     
      console.log(adoptionData)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl mb-4">Adopt {pet.petName}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="petId" value={pet._id} {...register("petId")} />
                    <input type="hidden" name="petName" value={pet.petName} {...register("petName")} />
                    <input type="hidden" name="petImage" value={pet.image} {...register("petImage")} />
                    <div className="mb-4">
                        <label className="block text-gray-700">User Name</label>
                        <input type="text" defaultValue={user?.displayName} disabled className="input input-bordered w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" defaultValue={user?.email} disabled className="input input-bordered w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input type="text" {...register("phone", { required: true })} className="input input-bordered w-full" />
                        {errors.phone && <p className="text-red-500 text-sm">Phone number is required.</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <textarea {...register("address", { required: true })} className="textarea textarea-bordered w-full"></textarea>
                        {errors.address && <p className="text-red-500 text-sm">Address is required.</p>}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="btn btn-secondary mr-2" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdoptModal;
