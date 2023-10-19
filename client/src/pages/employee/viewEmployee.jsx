import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../../../secrete";
import Loading from "../../components/loading";
import { useGetAEmployeeById } from "../../hooks/useEmployee";
import { GiGraduateCap } from "react-icons/gi";
import { PiUserCircleGear } from "react-icons/pi";

const ViewEmployee = () => {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isSuccess, isError, error } =
    useGetAEmployeeById(id);

  if (isLoading) return <Loading />;
  if (isError) {
    console.log(error);
  }

  let employee;
  if (isSuccess) {
    employee = data?.data.payload.employee;
    console.log(employee.skills);

    const date = new Date(employee.joiningDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const withHyphens = [day, month, year].join("-");
    employee.joinDate = withHyphens;

    // console.log(employee);
  }

  return (
    <>
      <div className="p-1 ">
        <div className="px-5 flex flex-col md:flex-row gap-7 w-full md:h-20 py-3 bg-base-200 justify-between items-center rounded-md">
          <h1 className="text-4xl font-bold ">Employee Profile</h1>
          <Link to="/all-employees" className="btn btn-info">
            all employees
          </Link>
        </div>

        <div className=" flex flex-col mt-10 gap-14 ">
          <div className="w-full flex flex-col lg:flex-row  items-center bg-base-200 rounded-xl py-3 hover:shadow-xl">
            <div
              className="flex flex-col lg:flex-row md:w-[50%] gap-8 m-4 py-5 ps-4 pe-10  items-start border-b-2 lg:border-b-0 lg:border-e-2 border-info border-dashed"
              id="modal-modal-title">
              <div className="avatar">
                <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={`${backendUrl}${employee?.image}`}
                    alt="employee image"
                  />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {employee?.firstName} {employee?.lastName}
                </p>
                <p className="text-base">Position : {employee?.position}</p>
                <p className="mt-2">Department : {employee?.department}</p>

                <p className="mt-2 font-semibold">
                  Employee ID : {employee?._id}
                </p>
                <p className="">Date of Join : {employee?.joinDate}</p>
              </div>
            </div>

            <div className="p-5 lg:ps-8 md:w-[50%]">
              <div>
                <ul className="flex w-full flex-col gap-3 ">
                  <li className="flex">
                    <p className="w-[30%]">Phone :</p>
                    <p className="w-[70%] text-info">{employee?.phoneNumber}</p>
                  </li>
                  <li className="flex">
                    <p className="w-[30%]">Email :</p>
                    <p className="text-info">{employee?.email}</p>
                  </li>
                  <li className="flex">
                    <p className="md:w-[30%]">Date Of Birth : </p>
                    <p>{employee?.age}</p>
                  </li>
                  <li className="flex">
                    <p className="md:w-[30%]">Address :</p>
                    <p>{employee?.address}</p>
                  </li>
                  <li className="flex">
                    <p className="md:w-[30%]">Salary :</p>
                    <p>{employee?.salary}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-10 ">
            <div className="bg-base-200 w-full rounded-xl py-7 px-7 hover:shadow-xl">
              <div className="flex gap-5 items-center">
                <p className="text-2xl font-bold text-info">
                  Education Informations
                </p>
                <GiGraduateCap className="text-2xl text-info" />
              </div>
              <div className="mt-5 ">
                <ul>
                  {employee?.education.map((edu, index) => {
                    return (
                      <li
                        key={index}
                        className="ps-7 p-1 ms-2 border-s border-info me-2">
                        <p className="text-lg">{edu.degree}</p>
                        <p>{edu.university}</p>
                        <p>{edu.graduationYear}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="bg-base-200 w-full rounded-xl py-7 px-7 hover:shadow-xl">
              <div className="flex gap-5 items-center">
                <p className="text-2xl font-bold text-info">Skills</p>
                <PiUserCircleGear className="text-2xl text-info" />
              </div>
              <div className="mt-5 flex gap-5 flex-1 flex-wrap flex-grow">
                {employee?.skills.map((skill, index) => {
                  return (
                    <div
                      className="m-2 badge badge-warning px-5 py-4 uppercase font-semibold"
                      key={index}>
                      {" "}
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEmployee;
