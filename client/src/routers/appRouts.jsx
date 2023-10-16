import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from '../App'
import ErrorPage from '../pages/errorPage'


const AppRouts = () => {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorPage: <ErrorPage />,
            children: [

            ],
        }
    ]) 
  return (
    <RouterProvider router={routes} />
  )
}

export default AppRouts