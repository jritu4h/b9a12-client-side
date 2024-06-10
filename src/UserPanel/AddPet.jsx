import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Listbox } from '@headlessui/react';
import { authContext } from '../Provider/Provider';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
const petCategories = ["Dog", "Cat", "Bird", "Fish", "Rabbit"];

const PetForm = () => {
   const imagekey= import.meta.env.VITE_IMAGEKEY
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  
  const ImageApi=`https://api.imgbb.com/1/upload?key=${imagekey}`
    const [axiosSecure]=UseAxiosSecure()

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
       const {petName,petAge,petCategory,petLocation,shortDescription,longDescription}=data
       const petData={
         petName:petName,
         petAge:petAge,
         petCategory:petCategory,
         petLocation:petLocation,
         shortDescription:shortDescription,
         longDescription:longDescription,
         name:user?.displayName,
         email:user?.email,
         status:'Not Adopted',
         image:ImageUrl,
         postDate:new Date()
       }
      console.log(petData)
         axiosSecure.post('/pets',petData)
         .then(()=>{
           toast.success('success')
         })
     }
   })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Pet Image</label>
        <input
          type="file"
          {...register('image', { required: 'Pet image is required' })}
        
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        {errors.petImage && <p className="text-red-500 text-xs italic">{errors.petImage.message}</p>}
      
      </div>
    

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Pet Name</label>
        <input
          type="text"
          {...register('petName', { required: 'Pet name is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        {errors.petName && <p className="text-red-500 text-xs italic">{errors.petName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Pet Age</label>
        <input
          type="text"
          {...register('petAge', { required: 'Pet age is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        {errors.petAge && <p className="text-red-500 text-xs italic">{errors.petAge.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Pet Category</label>
        <Listbox value={watch('petCategory')} onChange={(value) => setValue('petCategory', value)}>
          <Listbox.Button className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
            {watch('petCategory') || 'Select Category'}
          </Listbox.Button>
          <Listbox.Options>
            {petCategories.map((category) => (
              <Listbox.Option key={category} value={category}>
                {({ selected }) => (
                  <span className={`block cursor-pointer select-none relative py-2 pl-10 pr-4 ${selected ? 'bg-indigo-600 text-white' : 'text-gray-900'}`}>
                    {category}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <input type="hidden" {...register('petCategory', { required: 'Pet category is required' })} value={watch('petCategory') || ''} />
        {errors.petCategory && <p className="text-red-500 text-xs italic">{errors.petCategory.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Pet Location</label>
        <input
          type="text"
          {...register('petLocation', { required: 'Pet location is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        {errors.petLocation && <p className="text-red-500 text-xs italic">{errors.petLocation.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Short Description</label>
        <input
          type="text"
          {...register('shortDescription', { required: 'Short description is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
        {errors.shortDescription && <p className="text-red-500 text-xs italic">{errors.shortDescription.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Long Description</label>
        <textarea
          {...register('longDescription', { required: 'Long description is required' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-32"
        />
        {errors.longDescription && <p className="text-red-500 text-xs italic">{errors.longDescription.message}</p>}
      </div>

      <div className="mb-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PetForm;
