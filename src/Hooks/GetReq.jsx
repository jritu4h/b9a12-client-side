import React, { useContext } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { authContext } from '../Provider/Provider';

const GetReq = () => {
    const {user,loading}=useContext(authContext)
    const [axiosSecure]=UseAxiosSecure()
     const {data:adoptionRequests=[],refetch}=useQuery({
        queryKey:["Request",user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/request?email=${user?.email}`)
            return res.data;
        }
     })
    return [adoptionRequests,refetch]
};

export default GetReq;