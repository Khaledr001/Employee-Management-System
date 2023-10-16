import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import { useAuth } from "./hooks/useAuth";

const Admin = () => {
  const { isLogin } = useAuth();
  

  return (
    <div className="">
      <NavBar />
      {
        isLogin() ? (
          <div className="flex h-full min-h-[94vh]">
        {/* sideBar Component */}
        <div>
          <SideBar />
        </div>
        <div className="w-full py-4 lg:p-5">
          <Outlet />
        </div>
      </div>
        ) : null
      }
      
    </div>
  );
};

export default Admin;
