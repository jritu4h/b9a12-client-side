import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home/Home";

import Error from "../Components/Error/Error";
import Login from '../Components/LogIn/LogIn';
import Register from "../Components/Register/Register";
import Dashboard from "../Layout/Dashboard";
import PetForm from "../UserPanel/AddPet";
import TableMypets from "../UserPanel/TableMypets";
import Update from "../UserPanel/Update";
import PetsList from "../Pages/PetsList/PetsList";
import Detials from "../Pages/Detials/Detials";
import AdoptionRequests from "../UserPanel/AdoptRequest";
import CreateDonationCampaign from "../UserPanel/CreateDonation";
import DonationCampaigns from "../Pages/DonationCamping/DonationCamping";
import DonationDetails from "../Pages/DonationCamping/DonationVew";
import DonationManage from "../UserPanel/DonationManage";
import Edit from "../UserPanel/Edit";
import MyDonations from "../UserPanel/DonationPay";
import UsersManagement from "../Admin/UserManage";
import PetsManagement from "../Admin/PetList";
import DonationCampaignsManagement from "../Admin/Donation";
import AdminPrivate from "../Private/AdminPrivate";
import PrivateRoute from "../Private/Private";
  export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
   
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/pets-list',
            element:<PetsList></PetsList>
        },
        {
            path:'/donation-camping',
            element:<PrivateRoute><DonationCampaigns></DonationCampaigns></PrivateRoute>
        },
       
        {
            path:'/donation/:id',
            element:<PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>,
            loader:({params})=>fetch(`https://pet-server-taupe.vercel.app/donation/${params.id}`)
        },
        {
            path:'/details/:id',
            element:<PrivateRoute><Detials></Detials></PrivateRoute>,
            loader:({params})=>fetch(`https://pet-server-taupe.vercel.app/pet/${params.id}`)
        },
       {
        path:'/login',
        element:<Login></Login>
       },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'*',
          element:<Error></Error>
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'add-pets',
          element:<PetForm></PetForm>
        },
        {
          path:'myadded-pets',
          element:<TableMypets></TableMypets>
        },
        {
          path:'adoption-request',
          element:<AdoptionRequests></AdoptionRequests>
        },
        {
          path:'create-donation-campaign',
          element:<CreateDonationCampaign></CreateDonationCampaign>
        },
        {
          path:'my-donation-camping',
          element:<DonationManage></DonationManage>
      },
        {
          path:'my-donation',
          element:<MyDonations></MyDonations>
      },
        {
          path:'edit-donation/:id',
          element:<Edit></Edit>,
          loader:({params})=>fetch(`https://pet-server-taupe.vercel.app/donation/${params.id}`)
        },
        {
          path:'update/:id',
          element:<Update></Update>,
          loader:({params})=>fetch(`https://pet-server-taupe.vercel.app/pet/${params.id}`)
        },

        // admin

        {
          path:'user-management',
          element:<AdminPrivate><UsersManagement></UsersManagement></AdminPrivate>
        },
        {
          path:'all-pets',
          element:<AdminPrivate><PetsManagement></PetsManagement></AdminPrivate>
        },
        {
          path:'all-donation',
          element:<AdminPrivate><DonationCampaignsManagement></DonationCampaignsManagement></AdminPrivate>
        }
      ]
    
    }
  ]);