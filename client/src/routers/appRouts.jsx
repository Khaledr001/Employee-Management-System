import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/authentication/login'
import Register from '../pages/authentication/register'
import ErrorPage from '../pages/errorPage'
import AllEmployees from '../pages/employee/allEmployees'


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