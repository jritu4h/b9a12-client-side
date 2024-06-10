import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SetAdmin from '../../Hooks/SetAdmin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AvatarDropdown = ({user,logout}) => {
  const [isOpen, setIsOpen] = useState(false);
 const [isAdmin]=SetAdmin()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handelLogOut=()=>{
    logout().then(() => {
      toast.success('logout')
    }).catch((err) => {
         console.log(err)
    });
  }

  return (
    <div className="relative inline-block text-left z-10">
      <div>
        <button
          type="button"
          className="flex items-center focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          <img
            className="w-[50px]  rounded-full"
            src={user?.photoURL}
            alt="Avatar"
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <Link
              to={`${isAdmin?'/dashboard/user-management':'/dashboard/add-pets'}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              DashBoard
            </Link>
            <button onClick={handelLogOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;