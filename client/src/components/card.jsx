/* eslint-disable react/prop-types */
import { MdGroups2, MdOutlineArrowRightAlt } from "react-icons/md";
import {HiOutlineCurrencyBangladeshi} from "react-icons/hi2"
import { FaUsers } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyCard = (props) => {
  return (
    <>
      {props.title == "Total Employees" && (
        <div className="h-[8.5rem] w-[18rem] flex p-5 px-6 rounded-xl  bg-base-200 shadow-2xl hover:shadow">
          <div className=" w-full ">
            <div className="flex gap-4 text-lg">
              {" "}
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#23b7e5]">
                <FaUsers className=" text-gray-100" />
              </div>
              <div className="">
                <p className="text-primary text-base">{props.title}</p>
                <p className="text-xl font-bold ms-1 mt-1">{props.number}</p>
              </div>
            </div>
            <div className="mt-5 ms-[57px]">
              <Link
                to="/all-employees"
                className="text-[#23b7e5] text-sm flex items-center gap-2">
                <p>View All</p> <MdOutlineArrowRightAlt className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {props.title == "Total Users" && (
        <div className="h-[8.5rem] w-[18rem] flex p-5 px-6 rounded-xl  bg-base-200 shadow-2xl hover:shadow">
          <div className=" w-full ">
            <div className="flex gap-4 text-lg">
              {" "}
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#845adf]">
                <MdGroups2 className=" text-gray-100" />
              </div>
              <div className="">
                <p className="text-primary text-base">{props.title}</p>
                <p className="text-xl font-bold ms-1 mt-1">{props.number}</p>
              </div>
            </div>
            <div className="mt-5 ms-[57px]">
              <Link
                to="/all-users"
                className="text-[#845adf] text-sm flex items-center gap-2">
                <p>View All</p> <MdOutlineArrowRightAlt className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {props.title == "Average Employee Age" && (
        <div className="h-[8.5rem] w-[18rem] flex p-5 px-6 rounded-xl  bg-base-200 shadow-2xl hover:shadow">
          <div className=" w-full ">
            <div className="flex gap-4 text-lg">
              {" "}
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#f5b849]">
                <IoPersonSharp className=" text-gray-100" />
              </div>
              <div className="">
                <p className="text-primary text-base">{props.title}</p>
                <p className="text-xl font-bold mt-1">{props.number}</p>
              </div>
            </div>
            <div className="mt-5 ms-[57px]">
              <Link
                to="/all-employees"
                className="text-[#f5b849] text-sm flex items-center gap-2">
                <p>View All Employee</p>{" "}
                <MdOutlineArrowRightAlt className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {props.title == "Total Employee Salary" && (
        <div className="h-[8.5rem] w-[18rem] flex p-5 px-6 rounded-xl  bg-base-200 shadow-2xl hover:shadow">
          <div className=" w-full ">
            <div className="flex gap-4 text-lg">
              {" "}
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#26bf94]">
                <HiOutlineCurrencyBangladeshi className=" text-gray-100 text-2xl" />
              </div>
              <div className="">
                <p className="text-primary text-base">{props.title}</p>
                <p className="text-xl font-bold mt-1">{props.number} TK</p>
              </div>
            </div>
            <div className="mt-5 ms-[57px]">
              <Link
                to="/all-employees"
                className="text-[#26bf94] text-sm flex items-center gap-2">
                <p>View All Employee</p>{" "}
                <MdOutlineArrowRightAlt className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCard;
