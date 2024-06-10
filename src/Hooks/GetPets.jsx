import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const GetPets = () => {
    const [axiosSecure]=UseAxiosSecure()
     const {data:getpet=[],refetch}=useQuery({
        queryKey:["getpet"],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/pets`)
            return res.data;
        }
     })
    return [getpet,refetch]
};

export default GetPets;