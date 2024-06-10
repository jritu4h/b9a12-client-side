import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import './index.css'
import {
 
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import Provider from './Provider/Provider';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <div className=' max-w-screen-7xl mx-auto'>
   <Provider>
   <QueryClientProvider client={queryClient}>
   <RouterProvider router={router} />
   </QueryClientProvider>
   </Provider>
   <ToastContainer></ToastContainer>
     </div>
  </React.StrictMode>,
)
