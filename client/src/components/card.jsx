/* eslint-disable react/prop-types */
import { MdGroups2 } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

const MyCard = (props) => {
  return (
    <>
      {props.title == "Total Employees" && (
        <div className="h-24 flex p-5 px-8 rounded-xl w-80 bg-base-200 shadow-xl hover:shadow">
          <div className=" w-full flex flex-row justify-between items-center">
            <h2 className="card-title">
              {" "}
              <FaUsers className="text-4xl text-warning" /> {props.title}
            </h2>
            <p className="text-2xl font-extrabold text-info">{props.number}</p>
          </div>
        </div>
      )}

      {props.title == "Total Users" && (
        <div className="h-24 flex p-5 px-8 rounded-xl w-80 bg-base-200 shadow-xl hover:shadow">
          <div className=" w-full flex flex-row justify-between items-center">
            <h2 className="card-title">
              {" "}
              <MdGroups2 className="text-4xl text-warning" /> {props.title}
            </h2>
            <p className="text-2xl font-extrabold text-info">{props.number}</p>
          </div>
        </div>
      )}

      {props.title == "Average Employee Age" && (
        <div className="h-24 flex p-5 px-6 rounded-xl w-80 bg-base-200 shadow-xl hover:shadow">
          <div className=" w-full flex flex-row justify-between items-center">
            <h2 className="card-title">
              {" "}
              <IoPersonSharp className="text-4xl text-warning" /> {props.title}
            </h2>
            <p className="text-2xl font-extrabold text-info">{props.number}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCard;
