import { MdGroups2 } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { backendUrl } from "../../secrete";
import { Dashboard } from "@mui/icons-material";

const SideBar = () => {
  const [parrow, setParrow] = useState(false);
  const [plist, setPlist] = useState(true);

  const { isLogin } = useAuth();
  
  let user, img;
  if (isLogin) {
    user = JSON.parse(localStorage.getItem('user'));
    img = `${backendUrl}${user.image}`;
    // console.log(user);
  }

  const handleEmployee = () => {
    setParrow(!parrow);
    setPlist(!plist);
  };

  return (
    // {isLogi()}
    <>
      <div id="sidebar" className=" w-[270px] bg-base-200 h-full pt-5 px-3">
        {isLogin && (
          <div className="flex flex-col justify-center items-center gap-3 mt-2 mb-8 ">
            <div className="avatar">
              <div className="w-20 rounded-xl cursor-pointer">
                <img src={img} alt="user image" />
              </div>
            </div>
            <p>{ user?.name} </p>
          </div>
        )}

        <div className="grid gap-4">
          <Link to="/" className="flex justify-start items-center gap-2 text-lg btn">
            <Dashboard />
            <span>Dashboard</span>
          </Link>

          <div>
            <Link to="all-users"
              className="flex justify-between items-center btn pe-5">
              <div className="flex justify-start items-center gap-2 text-lg">
                <MdGroups2 className="text-2xl" />
                <span>users</span>
              </div>
            </Link>
            
          </div>

          <div>
            <div
              onClick={handleEmployee}
              className="flex justify-between items-center btn pe-5">
              <div className="flex justify-start items-center gap-2 text-lg">
                <FaUsers className="text-2xl" />
                <span>Employees</span>
              </div>
              {!parrow ? (
                <MdKeyboardArrowRight className="text-2xl" />
              ) : (
                <MdKeyboardArrowDown className="text-2xl" />
              )}
            </div>
            {!plist && (
              <div className="grid ps-9 pt-1">
                <ul className="">
                  <Link
                    to={"/all-employees"}
                    className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <span>All Employees</span>
                  </Link>
                  <Link
                    to={"/add-employee"}
                    className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <span>Add Employee</span>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
