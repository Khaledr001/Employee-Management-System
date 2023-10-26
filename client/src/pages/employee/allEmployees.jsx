import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { backendUrl } from "../../../secrete";
import Loading from "../../components/loading";
import { useDeleteEmployee, useGetAllEmployee } from "../../hooks/useEmployee";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const AllEmployees = () => {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [employeeId, setEmployeeId] = useState();
  const [dropdown, setDropdown] = useState('');
  const [employ, setEmploy] = useState();

  const getAllEmployeeResponse = useGetAllEmployee(dropdown);
  const deleteEmployeeResponse = useDeleteEmployee();
  // const deleteAUserResponse = useDeleteAUser();

  useEffect(() => {
    getAllEmployeeResponse.refetch();
  }, [dropdown])

  if (getAllEmployeeResponse.isLoading || getAllEmployeeResponse.isRefetching || deleteEmployeeResponse.isLoading)
    return <Loading />;

  if (getAllEmployeeResponse.isError || deleteEmployeeResponse.isError)
    return <p>Error</p>;

  let employees;
  if (getAllEmployeeResponse.isSuccess) {
    employees = getAllEmployeeResponse.data?.data.payload.employees;
  }

  if (deleteEmployeeResponse.isSuccess) {
    window.location.reload();
  }
  // if (deleteAUserResponse.isSuccess) window.location.reload();

  const deleteEmployeeState = async () => {
    console.log(employeeId);
    await deleteEmployeeResponse.mutate(employeeId);
    // handleDelete()
  };

  const handleDelete = (id) => {
    document.getElementById("deleteEmployee").showModal();
    console.log(id);
    setEmployeeId(id);
    // console.log(deleteAUserResponse.data?.data);
  };

  const handleJoinDate = (getDate, index, name) => {
    const date = new Date(getDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const withHyphens = [day, month, year].join("-");
    if (name == "join") employees[index].joinDate = withHyphens;
    if (name == "dob") employees[index].dob = withHyphens;
  };

  function calculateAge(birthDate, index) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    // If the birthdate has not occurred this year yet
    // or if the birthdate is this month but has not occurred yet
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    if (!employees[index].age) employees[index].age = age;
    // return age;
  }

  const handleClick = (employee) => {
    setEmploy(employee);
    if (employ) {
      handleOpen();
      // console.log(employ);
    }
  };

  const handleDropdownChange = (e) => {
    setDropdown(e.target.value);
  }

  return (
    <>
      <div>
        <div className="px-5 w-full h-20 bg-base-200 flex justify-between items-center rounded-md">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  md:ms-5 lg:ms-5">
            All employees
          </h1>
          <h1 className="text-lg lg:text-xl text-success font-bold md:me-5 lg:me-5">
            Total employees : {employees?.length}
          </h1>
        </div>

        <div className="mt-5 border border-info py-3 rounded-lg">
          <div className="overflow-x-auto mx-3">
            <div className="my-5 mx-1 flex justify-between items-center">
              <div className="relative">
                <span
                  // onClick={handleEmployeeSearch}
                  className="absolute hover:cursor-pointer btn-sm left-0.5 top-3.5">
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
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="Search Employee"
                  className=" input input-bordered rounded-xl border-info focus:outline-none focus:border-info focus:border-2 h-12 ps-10 pe-3 w-56 md:w-[400px] text-base"
                />
              </div>

              <div>
                <select
                  className="select select-info focus:border-none w-full max-w-xs"
                  defaultValue='nothiong'
                  value={dropdown}
                  onChange={handleDropdownChange}>
                  <option disabled selected value="">
                    Select Position
                  </option>
                  <option value="manager">Manager</option>
                  <option value="data analyst">Data Analyst</option>
                  <option value="froentend developer">
                    Froentend Developer
                  </option>
                  <option value="backend developer">Backend Developer</option>
                </select>
              </div>

              <Link to="/add-employee" className="btn btn-info">
                <span className="text-2xl">+</span> Add Employee
              </Link>
            </div>
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-300 text-base">
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>AGE</th>
                  <th>POSITION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {employees
                  ?.filter((employee) => {
                    const toMatch = `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.position}`;
                    return searchValue.toLowerCase() === ""
                      ? employee
                      : toMatch
                          .toLowerCase()
                          .includes(searchValue.toLowerCase());
                  })
                  .map((employee, index) => {
                    handleJoinDate(employee.joiningDate, index, "join");
                    calculateAge(employee.dateOfBirth, index);
                    let img = `${backendUrl}${employee.image}`;
                    return (
                      <tr key={employee._id} className="hover">
                        <td
                          className="avatar"
                          onClick={() => handleClick(employee)}>
                          <div className="w-10 rounded-full">
                            <img src={img} alt="" />
                          </div>
                        </td>
                        <td onClick={() => handleClick(employee)}>
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td onClick={() => handleClick(employee)}>
                          {employee.email}
                        </td>
                        <td onClick={() => handleClick(employee)}>
                          {employee.phoneNumber}
                        </td>
                        <td onClick={() => handleClick(employee)}>
                          {employee.age}
                        </td>
                        <td onClick={() => handleClick(employee)}>
                          {employee.position}
                        </td>
                        <td className="flex gap-1 mt-1 items-center justify-center">
                          <button
                            value={employee._id}
                            className="btn btn-sm btn-info btn-outline px-2.5 me-1 flex">
                            <FiEdit className="text-base" />
                          </button>
                          <button
                            value={employee._id}
                            onClick={() => handleDelete(employee._id)}
                            className="btn btn-sm btn-error btn-outline px-2.5">
                            <FiDelete className="text-base" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <dialog
        id="deleteEmployee"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl">
            Are you sure you want to delete this Employee?
          </h3>
          <p className="py-4">
            After clicking the delete button this employee will be deleted
            parmanently
          </p>
          <div className="modal-action flex gap-4">
            <button
              onClick={deleteEmployeeState}
              className="btn btn-sm h-10 btn-error">
              Delete
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm h-10">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          className="border-none bg-base-100 shadow-2xl px-6 py-7 rounded-2xl min-w-[300px] md:min-w-[650px]"
          sx={style}>
          <div className="flex gap-6 items-center" id="modal-modal-title">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={`${backendUrl}${employ?.image}`}
                  alt="employee image"
                />
              </div>
            </div>
            <p className="text-xl">
              {employ?.firstName} {employ?.lastName}
            </p>
          </div>
          <Box id="modal-modal-description" sx={{ mt: 4 }}>
            <Box className="flex flex-col gap-5">
              <Box className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Email</label>
                  <input
                    defaultValue={employ?.email}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>

                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Phone Number</label>
                  <input
                    defaultValue={employ?.phoneNumber}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>
              </Box>

              <Box className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Department</label>
                  <input
                    defaultValue={employ?.department}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>

                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Position</label>
                  <input
                    defaultValue={employ?.position}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>
              </Box>

              <Box className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Joining Date</label>
                  <input
                    defaultValue={employ?.joinDate}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>

                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Salary</label>
                  <input
                    defaultValue={employ?.salary}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>
              </Box>

              <Box className="flex flex-col md:flex-row md:justify-between gap-5 items-center">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Age</label>
                  <input
                    defaultValue={employ?.age}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>

                <Link
                  to={`/employee/${employ?._id}`}
                  className="btn btn-outline btn-info mt-5 w-36 rounded-lg me-5 border text-lg">
                  View
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AllEmployees;
