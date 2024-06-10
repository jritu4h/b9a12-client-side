import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GetPets from '../../../Hooks/GetPets';
import { Link } from 'react-router-dom';
const Category = () => {
  const [getpet]=GetPets()
    return (
      <div className='my-4'>
          <Tabs>
          <div className='flex flex-col items-center'>
          <TabList>
          <Tab>Dogs</Tab>
          <Tab>Cats</Tab>
          <Tab>Bird</Tab>
          <Tab>Fish</Tab>
          <Tab>Rabbit</Tab>
        </TabList>
          </div>
    
        <TabPanel>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-3'>
        {
           getpet?.filter(pet=>pet.petCategory==='Dog').map(pet=>(
            <div className=" rounded overflow-hidden shadow-lg p-4 bg-white">
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
        </TabPanel>
        <TabPanel>
        <div className='grid lg:grid-cols-3 grid-cols-1'>
        {
           getpet?.filter(pet=>pet.petCategory==='Cat').map(pet=>(
            <div className=" rounded overflow-hidden shadow-lg p-4 bg-white">
    <div className='flex flex-col items-center'>
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
        </TabPanel>
        <TabPanel>
        <div className='grid lg:grid-cols-3 grid-cols-1'>
        {
           getpet?.filter(pet=>pet.petCategory==='Bird').map(pet=>(
            <div className=" rounded overflow-hidden shadow-lg p-4 bg-white">
    <div className='flex flex-col items-center'>
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
        </TabPanel>
        <TabPanel>
        <div className='grid lg:grid-cols-3 grid-cols-1'>
        {
           getpet?.filter(pet=>pet.petCategory==='Fish').map(pet=>(
            <div className=" rounded overflow-hidden shadow-lg p-4 bg-white">
    <div className='flex flex-col items-center'>
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
        </TabPanel>
        <TabPanel>
        <div className='grid lg:grid-cols-3 grid-cols-1'>
        {
           getpet?.filter(pet=>pet.petCategory==='Rabbit').map(pet=>(
            <div className="rounded overflow-hidden shadow-lg p-4 bg-white">
    <div className='flex flex-col items-center'>
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
        </TabPanel>
      </Tabs>
      </div>
    );
};

export default Category;