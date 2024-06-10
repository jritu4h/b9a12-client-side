import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { authContext } from '../../Provider/Provider';
import AdoptModal from './Modal';

const Detials = () => {
    const pet=useLoaderData()
    const {user}=useContext(authContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
           <div className="container mx-auto py-24">
            <div className="rounded overflow-hidden shadow-lg p-4 bg-white">
                <div className='flex justify-center'>
                    <img className="h-[200px]" src={pet.image} alt={pet.petName} />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2">{pet.petName}</div>
                    <p className="text-gray-700 text-base">{pet.shortDescription}</p>
                    <p className="text-gray-700 text-base">{pet.longDescription}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        Age: {pet.petAge}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        Category: {pet.petCategory}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        Location: {pet.petLocation}
                    </span>
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 ${pet.status === "Not Adopted" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}`}>
                        Status: {pet.status}
                    </span>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="block text-gray-700">Owner: {pet.name}</span>
                </div>
              {
                pet.status==='Adopted'?<p className='text-xl text-red-500 py-3'>Adopted</p>:  <button className="btn btn-success text-white mt-4" onClick={openModal}>Adopt</button>
              }
            </div>

            {isModalOpen && (
                <AdoptModal
                    pet={pet}
                    user={user}
                    closeModal={closeModal}
                />
            )}
        </div>  
        </div>
    );
};

export default Detials;