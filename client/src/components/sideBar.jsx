import { HiOutlineViewGrid } from "react-icons/hi";
import { MdGroups2 } from "react-icons/md";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SideBar = () => {
  const [parrow, setParrow] = useState(false);
  const [plist, setPlist] = useState(true);

  const [uarrow, setUarrow] = useState(false);
  const [ulist, setUlist] = useState(true);

  const {isLogin} = useAuth();

  const handleEmployee = () => {
    setParrow(!parrow);
    setPlist(!plist);
  };

  const handleUser = () => {
    setUarrow(!uarrow);
    setUlist(!ulist);
  };

  return (
    // {isLogi()}
    <>
      <div id="sidebar" className=" w-[290px] bg-base-200 h-full pt-5 px-3">
        <div className="grid gap-4">
          <div className="flex justify-start items-center gap-2 text-lg btn">
            <HiOutlineViewGrid className="text-2xl" />
            <span>Dashboard</span>
          </div>

          <div>
            <div
              onClick={handleUser}
              className="flex justify-between items-center btn pe-5">
              <div className="flex justify-start items-center gap-2 text-lg">
                <MdGroups2 className="text-2xl" />
                <span>users</span>
              </div>
              {!uarrow ? (
                <MdKeyboardArrowRight className="text-2xl" />
              ) : (
                <MdKeyboardArrowDown className="text-2xl" />
              )}
            </div>
            {!ulist && (
              <div className="grid ps-9 pt-1">
                <ul className="">
                  <li className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <Link to="/admin/allusers">All users</Link>
                  </li>
                  <li className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <Link to="/admin/updateuser">update user</Link>
                  </li>
                  <li className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <span>delete user</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center btn pe-5">
              <div className="flex justify-start items-center gap-2 text-lg">
                <TfiLayoutListThumb className="text-2xl" />
                <Link to="/admin/allcategory">Category</Link>
              </div>
            </div>
          </div>

          <div>
            <div
              onClick={handleEmployee}
              className="flex justify-between items-center btn pe-5">
              <div className="flex justify-start items-center gap-2 text-lg">
                <LiaLuggageCartSolid className="text-2xl" />
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
                    to={"/admin/add-employee"}
                    className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <span>Add Employee</span>
                  </Link>
                  <li className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <span>update Employee</span>
                  </li>
                  <li className="btn btn-sm w-full flex justify-start">
                    {" "}
                    <span>delete employee</span>
                  </li>
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
