import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/authentication/login'
import Register from '../pages/authentication/register'
import ErrorPage from '../pages/errorPage'
import AllEmployees from '../pages/employee/allEmployees'
import ViewEmployee from '../pages/employee/viewEmployee'
import AddEmployee from '../pages/employee/addEmployee'
import EditEmployee from '../pages/employee/editEmployee'


const AppRouts = () => {
    const routes = createBrowserRouter([
      {
        path: '/',
        element: <App />,
        errorPage: <ErrorPage />,
        children: [
          {
            path: "all-employees",
            element: <AllEmployees />,
          },  
          {
            path: 'add-employee',
            element: <AddEmployee />,
          },
          {
            path: 'employee/:id',
            element: <ViewEmployee />,
          },
          {
            path: 'edit/:id',
            element: <EditEmployee />,
          },
        ],
      },
      {
        path: '/login',
          element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      }
    ]) 
  return (
    <RouterProvider router={routes} />
  )
}

export default AppRouts