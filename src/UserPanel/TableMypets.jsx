import React, { useContext, useEffect, useState } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { authContext } from '../Provider/Provider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import GetPets from '../Hooks/GetPets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TableMypets = () => {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [axiosSecure] = UseAxiosSecure()
  const { user } = useContext(authContext)
  const [, refetch] = GetPets()
  useEffect(() => {
    fetchPets();
  }, [page]);

  const fetchPets = async () => {
    try {
      const response = await axiosSecure.get(`/petspegination?page=${page}&limit=${limit}`);
      setPets(response.data.results);
      setTotalPages(response.data.totalPages);
      setLimit(response.data.limit);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };



  const handleDelete = (ID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        axiosSecure.delete(`/pet/${ID}`)
          .then(data => {
            console.log(data.data)
            refetch()
          })

        console.log(ID)
      }
    });
  }

  const handleAdopt = (id) => {
    axiosSecure.patch(`/pet/${id}`, { status: 'Adopted' })
      .then(() => {
        toast.success('Success')
      })
  }
  return (
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3">Serial Number</th>
            <th className="px-6 py-3">Pet Image</th>
            <th className="px-6 py-3">Pet Name</th>
            <th className="px-6 py-3">Pet Category</th>
            <th className="px-6 py-3">Adoption Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pets?.filter(pet => pet.email === user?.email).map((pet, index) => (
            <tr key={pet.id}>
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">
                <img src={pet.image} alt={pet.name} className="h-12 w-12 object-cover" />
              </td>
              <td className="px-6 py-4">{pet.petName}</td>
              <td className="px-6 py-4">{pet.petCategory}</td>
              <td className="px-6 py-4">{pet.status === 'Adopted' ? 'Adopted' : 'Not Adopted'}</td>
              <td className="px-6 py-4 space-x-2 flex">
                <Link to={`/dashboard/update/${pet._id}`}>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(pet._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleAdopt(pet._id)} disabled={pet.status === 'Adopted'}
                >
                  {pet.status === 'Adopted' ? "Adopted" : 'Adopt'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='text-center mt-6'>
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};


const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div>
      <button className='btn btn-primary' onClick={handlePrevious} disabled={page === 1}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button className='btn btn-primary' onClick={handleNext} disabled={page === totalPages}>Next</button>
    </div>
  );
};

export default TableMypets;