import Form from "../Pages/Form/Form";
import Login from "../Pages/Login/Login";
import Dashboard from '../Layouts/Dashboard'
import ConfirmPage from '../Pages/ConfrimPage/ConfrimPage'

const dashRoute = [{
    path: "/",
    exact: true,
    Component: Login
  },
  {
    path: "/form",
    exact: false,
    Component: Form
  },
  {
    path: "/dashboard",
    exact: false,
    Component: Dashboard
  },
  {
    path: '/confrim',
    exact: false,
    Component: ConfirmPage
  }
];
export default dashRoute;