import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { backendUrl } from "../../../secrete";
import Loading from "../../components/loading";
import { useGetAllEmployee } from "../../hooks/useEmployee";
import { Link } from "react-router-dom";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const AllEmployees = () => {  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [employ, setEmploy] = useState();

  const getAllEmployeeResponse = useGetAllEmployee();
  // const deleteAUserResponse = useDeleteAUser();
  
  if (getAllEmployeeResponse.isLoading ) return <Loading />;

  let employees;
  if (getAllEmployeeResponse.isSuccess) {
    employees = getAllEmployeeResponse.data?.data.payload.employees; 
  }
  // if (deleteAUserResponse.isSuccess) window.location.reload();


  const handleDelete = (id) => {
    console.log(id);
    const sure = window.confirm("Are you sure you want to delete this item?");
    if (sure) {
      console.log(id);
      // deleteAUserResponse.mutate(id);
    }

    // console.log(deleteAUserResponse.data?.data);
  };

  const handleJoinDate = (joiningDate, index) => {
      const date = new Date(joiningDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const withHyphens = [day, month, year].join("-");
    employees[index].joinDate = withHyphens;
  }

  const handleClick = (employee) => { 
    setEmploy(employee); 
    if (employ) {


      handleOpen();
      console.log(employ);
    }
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
              {employees?.map((employee, index) => {
                handleJoinDate(employee.joiningDate, index);
                let img = `${backendUrl}${employee.image}`
                return (
                  <tr onClick={() => handleClick(employee)} key={employee._id} className="hover">
                    <td><img className="avatar h-10 w-10" src={img} alt="" /></td>
                    <td>{employee.firstName} { employee.lastName }</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.age }</td>
                    <td>{employee.position }</td>
                    <td className="flex gap-1 mt-1">
                      <button
                        value={employee._id}
                        className="btn btn-sm btn-info btn-outline rounded-3xl me-1 flex">
                        <MdEdit />
                        <p className="text-xs">Edit</p>
                      </button>
                      <button
                        value={employee._id}
                        onClick={() => handleDelete(employee._id)}
                        className="btn btn-sm btn-error btn-outline rounded-3xl text-xs">
                        delete
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
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="border-none bg-base-100 shadow-2xl px-6 py-7 rounded-2xl min-w-[300px] md:min-w-[650px]" sx={style}>
          <div className="flex gap-6 items-center" id="modal-modal-title">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={`${backendUrl}${employ?.image}`} alt="employee image" />
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
                  <label className="ps-2" >Email</label>
                  <input defaultValue={employ?.email} type="text"  className="input input-bordered focus:outline-none w-full"  />
                </div>
                
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2" >Phone Number</label>
                  <input defaultValue={employ?.phoneNumber} type="text"  className="input input-bordered focus:outline-none w-full"  />
                </div>
              </Box>
              
              <Box className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2" >Department</label>
                  <input defaultValue={employ?.department} type="text"  className="input input-bordered focus:outline-none w-full"  />
                </div>
                
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2" >Position</label>
                  <input defaultValue={employ?.position} type="text"  className="input input-bordered focus:outline-none w-full"  />
                </div>
              </Box>
              
              <Box className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2" >Joining Date</label>
                  <input defaultValue={employ?.joinDate} type="text"  className="input input-bordered focus:outline-none w-full"  />
                </div>
                
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2" >Salary</label>
                  <input defaultValue={employ?.salary} type="text"  className="input input-bordered focus:outline-none w-full"  />
                </div>
              </Box>
              
              <Box className="flex flex-col md:flex-row md:justify-between gap-5 items-center">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2" >Age</label>
                  <input defaultValue={employ?.age} type="text"  className="input input-bordered focus:outline-none w-full"  />
                </div>

                <Link to={`/employee/${employ?._id}`} className="btn btn-outline btn-info mt-5 w-36 rounded-lg me-5 border text-lg">View</Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AllEmployees;
