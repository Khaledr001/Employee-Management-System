import { Link } from "react-router-dom";
import Loading from "../../components/loading";
import { useGetAllEmployee } from "../../hooks/useEmployee";
import { MdEdit } from "react-icons/md";
import { backendUrl } from "../../../secrete";

const AllEmployees = () => {  
  const getAllEmployeeResponse = useGetAllEmployee();
  // const deleteAUserResponse = useDeleteAUser();
  
  if (getAllEmployeeResponse.isLoading ) return <Loading />;

  let employees;
  if (getAllEmployeeResponse.isSuccess) {
    employees = getAllEmployeeResponse.data?.data.payload.employees; 
  }
  // if (deleteAUserResponse.isSuccess) window.location.reload();


  const handleDelete = (id) => {
    const sure = window.confirm("Are you sure you want to delete this item?");
    if (sure) {
      console.log(id);
      // deleteAUserResponse.mutate(id);
    }

    // console.log(deleteAUserResponse.data?.data);
  };

  const handleClick = (employee) => { 
    console.log(employee.lastName);
  }

  return (
    <>
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
              {employees?.map((employee) => {
                let img = `${backendUrl}${employee.image}`
                return (
                  <tr onClick={handleClick(employee)} key={employee._id} className="hover">
                    <td><img className="avatar h-10 w-10" src={img} alt="" /></td>
                    <td>{employee.firstName} { employee.lastName }</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.age }</td>
                    <td>{employee.position }</td>
                    <td className="flex gap-1 mt-1">
                      {" "}
                      <div className="btn btn-sm btn-info btn-outline rounded-3xl me-1 flex">
                        <MdEdit />
                        <p className="text-xs">Edit</p>
                      </div>
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
    </>
  );
};

export default AllEmployees;
