import React, { useContext } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { authContext } from '../Provider/Provider';
import { useQuery } from '@tanstack/react-query';

const GetPayment = () => {
    const {user,loading}=useContext(authContext)
    const [axiosSecure]=UseAxiosSecure()
     const {data:donations=[],refetch}=useQuery({
        queryKey:["Request",user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/my-donation-pay?email=${user?.email}`)
            return res.data;
        }
     })
    return [donations,refetch]
};

export default GetPayment;