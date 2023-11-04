/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { PiWarningCircleBold } from "react-icons/pi";
import { useAuth } from "../hooks/useAuth";
import userServices from "../services/userServices";
import { backendUrl } from "../../secrete";
import { useGetAllEmployee } from "../hooks/useEmployee";
import Loading from "./loading";

function Navbar() { 
  const handleToggle = (e) => {
    if (e.target.checked) setTheme("darcula");
    else setTheme("mylight");
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "mylight"
  );
  const [sideBar, setSideBar] = useState(false);
  const [userImage, setUserImage] = useState();
  const [search, setSearch] = useState();
  
  const { data, isLoading, isError, isSuccess, refetch } = useGetAllEmployee(search);
  const { isLogin, onLogout } = useAuth();

  const navigate = useNavigate();
  
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) { 
      // console.log(user);
      const img = `${backendUrl}${user.image}`;
      setUserImage(img);
    }
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    setSideBar(!sideBar);
    if (sideBar) {
      sidebar.classList.add("hidden");
    } else {
      sidebar.classList.remove("hidden");
    }
  }

  const handleEmployeeSearch = () => {
    // console.log(search);
    refetch();
    // setSearch('');
    navigate('/all-employees');
  }
  
  if (isLoading) {
    <Loading />
  }
  
  if (isSuccess) {
    //  console.log(data?.data.payload.employees);
   }


  return (
    <div className="fixed shadow-lg z-10 top-0 right-0 left-0 ">
      <div id="nav1" className="navbar bg-base-200 flex justify-between">
        <div className="flex justify-between lg:min-w-[260px]">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl text-orange-500">
            EMS
          </Link>

          {isLogin() ? (
            <label className="btn btn-sm btn-circle swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input onClick={handleSidebar} className="hidden" type="checkbox" />

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </label>) : null}
        </div>
        <div className="navbar-center">
          <div className="h-10 relative me-3 md:me-10 lg:me-16">
            <input
              type="text"
              placeholder="Search Employee"
              onChange={(e) => {setSearch(e.target.value);}}
              className="input input-bordered rounded-xl focus:outline-none focus:border-info h-10 pe-7 ps-4 w-44 md:w-[420px] lg:w-[500px] text-base"
            />
            <span onClick={handleEmployeeSearch} className="absolute hover:cursor-pointer btn-sm right-1 top-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="navbar-end w-auto flex gap-4">

          {isLogin() ? (
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn p-0 btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                  {/* <img src="" /> */}
                  {userImage ? ( <img className="" src={userImage} /> ) : <AiOutlineUser className="w-full h-full" />}
                
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <p className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </p>
              </li>
              <li>
                <Link
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }>
                  Logout
                </Link>
              </li>
              <li>
                <label className="swap swap-rotate ps-4">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    className="hidden"
                    onChange={handleToggle}
                    checked={theme == "mylight" ? false : true}
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-on fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-off fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </li>
            </ul>
            </div>
          ) :
          (
            <Link to='/login' className="btn btn-warning btn-outline btn-sm h-9"> Login </Link>  
          )
          }
          
        </div>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex flex-col justify-center items-center">
            <PiWarningCircleBold className="w-12 h-12 text-red-600" />
            <p className="py-4 text-xl font-bold">
              Are you sure you want to log out?
            </p>
          </div>
          <div className="modal-action ">
            <button onClick={onLogout} className="btn btn-error me-3">yes i'm sure</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn ">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Navbar;
