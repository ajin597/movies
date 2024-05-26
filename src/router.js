import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import App from "./App";
import Register from "./components/Auth/register";
import Login from "./components/Auth/Login";
import Dateb from "./components/Dateb"
import ShowBooking from "./components/ShowBooking";
import Pay from "./components/pay";
import List from "./components/List"
import HandleBooking from "./components/HandleBooking";
import ListPost from "./components/admin/ListPost";





const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    { path : 'register' , element : <Register/> },
   { path : '/Login' , element : <Login/> },
    {path:"/blog", element:<Dateb />},
   { path:"/blog1/:showId", element:<ShowBooking /> },
   { path: '/pay/:showId', element:<Pay/> },
   { path: 'list', element:<List/> },
   { path: '/hh/:showId', element:<HandleBooking/> },
   { path: 'list1', element:<ListPost/> }

   

   



]);

export default router;