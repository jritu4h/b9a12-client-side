import React, { useContext } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { authContext } from '../Provider/Provider';
import { useQuery } from '@tanstack/react-query';

const SetAdmin = () => {
    const {user,loading}=useContext(authContext)
    const [axiosSecure]=UseAxiosSecure()
     const {data:isAdmin,isLoading:isAdminLoading}=useQuery({
        queryKey:["isAdmin",user?.email],
        enabled: !loading,
        queryFn:async()=>{
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)
            return res.data.admin;
        }
     })
    return [isAdmin,isAdminLoading]
};

export default SetAdmin;