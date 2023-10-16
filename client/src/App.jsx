
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navBar'
import SideBar from './components/sideBar'

function App() {

  return (
    <>
      <Navbar />
      <div className="flex h-full min-h-[94vh]">
        {/* sideBar Component */}
        <div>
          <SideBar />
        </div>
        <div className="w-full py-4 lg:p-5">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App