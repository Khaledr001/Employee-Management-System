import { MdEdit } from "react-icons/md";
import { useDeleteAUser, useGetAllUsers } from "../../../hooks/useUser";
import Loading from "../../../components/Loading";

const AllUsers = () => {
  const getAllUsersResponse = useGetAllUsers();
  const deleteAUserResponse = useDeleteAUser();

  let users;
  if (getAllUsersResponse.isSuccess) {
    users = getAllUsersResponse.data?.data.payload.users;
    console.log(getAllUsersResponse.data?.data);
    console.log(users);
  }
  if (deleteAUserResponse.isSuccess) window.location.reload();
  if (getAllUsersResponse.isLoading || deleteAUserResponse.isLoading) return <Loading />;

  const handleDate = (createdAt, index) => {
    // console.log(createdAt);
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const withHyphens = [day, month, year].join("-");
    users[index].joinDate = withHyphens;

    // console.log(withHyphens);
    // console.log(date);
  };

  const handleDelete = (id) => {
    const sure = window.confirm("Are you sure you want to delete this item?");
    if (sure) {
      console.log(id);
      deleteAUserResponse.mutate(id);
    }

    console.log(deleteAUserResponse.data?.data);
  };

  return (
    <>
      <div className="px-5 w-full h-20 bg-base-200 flex justify-between items-center rounded-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  md:ms-5 lg:ms-5">
          All Users
        </h1>
        <h1 className="text-lg lg:text-xl text-success font-bold md:me-5 lg:me-5">
          Total Users : {users?.length}
        </h1>
      </div>

      <div className="mt-5 border border-info py-3 rounded-lg">
        <div className="overflow-x-auto mx-3">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-300 text-base">
                <th>USER ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE NUMBER</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>JOIN ON</th>

                {/* <th>TOTAL SELL</th> */}
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {users?.map((item, index) => {
                handleDate(item.createdAt, index);
                return (
                  <tr key={item.slug} value={item.slug} className="hover">
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      {item.role === "admin" ? (
                        <span className="btn btn-xs btn-success no-animation cursor-default">
                          Admin
                        </span>
                      ) : (
                        "Customer"
                      )}
                    </td>
                    <td>{item.isBaned ? "Banned" : "Active"}</td>
                    <td>{item.joinDate}</td>
                    {/* <td>{item.catagoryName}</td> */}
                    <td className="flex gap-1">
                      {" "}
                      <div className="btn btn-sm btn-info btn-outline rounded-3xl me-1">
                        <MdEdit />
                        <p className="text-xs">Edit</p>
                      </div>
                      <button
                        value={item.slug}
                        onClick={() => handleDelete(item._id)}
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

export default AllUsers;
