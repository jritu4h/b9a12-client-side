import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const GetUser = () => {
   const [axiosSecure]=UseAxiosSecure()
   const {data:users=[],refetch}=useQuery({
    queryKey:["user"],
   
    queryFn:async()=>{
        const res = await axiosSecure.get(`/user`)
        return res.data;
    }
   })
   return [users,refetch]
};

export default GetUser;