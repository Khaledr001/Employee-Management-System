import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";

const Admin = () => {
  return (
    <div className="">
      <NavBar />
      <div className="flex h-full min-h-[94vh]">
        {/* sideBar Component */}
        <div>
          <SideBar />
        </div>
        <div className="w-full py-4 lg:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
