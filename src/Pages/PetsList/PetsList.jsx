import React, { useState } from 'react';
import GetPets from '../../Hooks/GetPets';
import { Link } from 'react-router-dom';

const PetsList = () => {
    const [getpet] = GetPets();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const filteredPets = getpet.filter(pet => {
        const matchesName = pet.petName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category ? pet.petCategory === category : true;
        return matchesName && matchesCategory;
    });

    return (
        <div className='py-24'>
            <div className="flex justify-between items-center py-4 mx-auto w-[90%]">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="input input-bordered w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full max-w-xs ml-4"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Fish">Fish</option>
                    <option value="Rabbit">Rabbit</option>
                </select>
            </div>

            <div className='grid lg:grid-cols-3 grid-cols-1 gap-3'>
                {
                    filteredPets.map(pet => (
                        <div key={pet._id} className="rounded overflow-hidden shadow-lg p-4 bg-white">
                            <div className='flex-flex-col items-center'>
                                <img className="h-[200px]" src={pet.image} alt={pet.petName} />
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{pet.petName}</div>
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
                            <Link to={`/details/${pet._id}`}><button className='btn btn-success text-white'>View Details</button></Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PetsList;
