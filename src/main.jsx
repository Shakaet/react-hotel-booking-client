import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './component/MainLayout';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './component/AuthProvider';
import Mybookings from './component/Mybookings';
import Myrooms from './component/Myrooms';
import Details from './component/Details';
import PrivateRoute from './component/PrivateRoute';
import NotFound from './component/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<NotFound></NotFound>,
    element:<MainLayout></MainLayout>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/myrooms",
        element:<Myrooms></Myrooms>
      },
      {
        path:"/mybooking",
        element:<PrivateRoute><Mybookings></Mybookings></PrivateRoute>
      },
      {
        path:"/roomDetails/:id",
        element:<PrivateRoute><Details></Details></PrivateRoute>
        
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
        <RouterProvider router={router} />
        {/* ToastContainer should be included in the main layout */}
      <ToastContainer />
  </AuthProvider>,
)
