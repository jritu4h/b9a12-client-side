import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import img1 from "../assets/received_830910895581844-removebg-preview-640x480.png"
import SetAdmin from '../Hooks/SetAdmin';
const Dashboard = () => {
    const [isAdmin]=SetAdmin()
    console.log(isAdmin)
    return (
        <div>
                <div className='flex'>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  py-5">
                <div className="">
                    
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Pets Care Agency</h5>
                </div>
                <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                   
                  <ul className='text-left'>
                {
                  isAdmin?<>
                  
                  <Link to="/dashboard/user-management" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Users Management</Link>
                    <Link to="/dashboard/all-pets" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">ALL Pets</Link>
                    <Link to="/dashboard/all-donation" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">All Donations</Link>
                  </>:<>
                    <Link to="/dashboard/add-pets" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Add a Pet</Link>
                    <Link to="/dashboard/myadded-pets" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">My Added Pets</Link>
                    <Link to="/dashboard/adoption-request" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Adoption Request</Link>
                    <Link to="/dashboard/create-donation-campaign" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Create Donation Campaign</Link>
                    <Link to="/dashboard/my-donation-camping" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">My Donation Campaigns</Link>
                    <Link to="/dashboard/my-donation" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">My Donations</Link>


                  </>
                }
                                    <hr />
                    <Link to="/" className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  </ul>
                 
                </nav>
            </div>

            <div className="w-full pt-5 px-4 mb-8 mx-auto ">
                <Outlet></Outlet>
            </div>
        </div> 
        </div>
    );
};

export default Dashboard;