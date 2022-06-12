import AddUser from "../Pages/dashboard/AddUser/AddUser";
import DashHome from "../Pages/dashboard/DashHome/DashHome";
import Users from "../Pages/dashboard/Users/Users"
import Login from "../Pages/Login/Login";

const dashMain= [
    {path:"/dashboard" , exact:true , Component : DashHome},
    {path:"/dashboard/users" , exact:true , Component : Users},
    {path:"/" , exact:true , Component : Login},

]
export default dashMain;