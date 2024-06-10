import React, { useContext } from 'react';


import { Link, Navigate } from 'react-router-dom';
import SetAdmin from '../Hooks/SetAdmin';
import { authContext } from '../Provider/Provider';

import loadingimg from '../assets/smartphone.gif';
const AdminPrivate = ({children}) => {
    const [isAdmin,isAdminLoading]=SetAdmin()
    const { user, loading } = useContext(authContext);
    if (loading||isAdminLoading) {
        return <>
                   <div>
          <div className='flex flex-col items-center py-[150px]'>
           <img className='h-[200px]' src={loadingimg} alt="" />
       <Link to='/login'>    <button className='btn btn-primary'>Login Please <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>
</button></Link>
        </div>
            </div>
        </>
    }
     if (user&&isAdmin) {
        return children
     }
     if (user&&!isAdmin) {
        return <Navigate to="/" replace={true}></Navigate>
     }
};

export default AdminPrivate;