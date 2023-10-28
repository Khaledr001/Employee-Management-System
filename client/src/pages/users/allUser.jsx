import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { backendUrl } from "../../../secrete";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import calculateAge from "../../services/calculateAge";
import { useGetAlluser } from "../../hooks/useUsers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const AllUsers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [usrId, setusrId] = useState();
  const [user, setuser] = useState();
  const [order, setOrder] = useState("ASC");
  const [users, setUsers] = useState();

  const getAllUserResponse = useGetAlluser();

  useEffect(() => {
    setUsers(getAllUserResponse.data?.data.payload.users);
  }, [getAllUserResponse.data?.data.payload.users]);

  useEffect(() => {
    getAllUserResponse.refetch();
  }, []);

  if (
    getAllUserResponse.isLoading ||
    getAllUserResponse.isRefetching
  )
    return <Loading />;

  if (getAllUserResponse.isError)
    return <p>Error</p>;

  const handleJoinDate = (getDate, index, name) => {
    const date = new Date(getDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const withHyphens = [day, month, year].join("-");
    if (name == "join") users[index].joinDate = withHyphens;
    if (name == "dob") users[index].dob = withHyphens;
  }; 

  const handleClick = (usr) => {
    setuser(usr);
    if (user) {
      handleOpen();
      // console.log(user);
    }
  };

  const sorting = (col) => {
    console.log(col);
    if (order == "ASC") {
      const sorted = users.sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      console.log(sorted);
      setUsers(sorted);
      setOrder("DESC");
    } else if (order == "DESC") {
      const sorted = users.sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      console.log(sorted);
      setUsers(sorted);
      setOrder("ASC");
    }
  };

  return (
    <>
      <div>
        <div className="px-5 w-full h-20 bg-base-200 flex justify-between items-center rounded-md">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  md:ms-5 lg:ms-5">
            All Users
          </h1>
          <h1 className="text-lg lg:text-2xl text-success font-bold md:me-5 lg:me-5">
            Total users : {users?.length}
          </h1>
        </div>

        <div className="mt-5 border border-info py-3 rounded-lg">
          <div className="overflow-x-auto mx-3">
            <div className="my-5 mx-1 flex justify-between items-center">
              <div className="relative">
                <span
                  // onClick={handleusersearch}
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
                  placeholder="Search usr"
                  className=" input input-bordered rounded-xl border-info focus:outline-none focus:border-info focus:border-2 h-12 ps-10 pe-3 w-56 md:w-[400px] text-base"
                />
              </div>
            </div>
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-300 text-base">
                  <th>IMAGE</th>
                  <th className="flex items-center gap-2">
                    NAME{" "}
                    <span
                      onClick={() => sorting("firstName")}
                      className="cursor-pointer">
                      <BiSort />
                    </span>{" "}
                  </th>

                  <th>PHONE</th>
                  <th className="flex items-center gap-2">
                    EMAIL{" "}
                    <span
                      onClick={() => sorting("firstName")}
                      className="cursor-pointer">
                      <BiSort />
                    </span>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {users
                  ?.filter((usr) => {
                    const toMatch = `${usr.firstName} ${usr.lastName} ${usr.email} ${usr.position}`;
                    return searchValue.toLowerCase() === ""
                      ? usr
                      : toMatch
                          .toLowerCase()
                          .includes(searchValue.toLowerCase());
                  })
                  .map((usr, index) => {
                    handleJoinDate(usr.joiningDate, index, "join");
                    const age = calculateAge(usr.dateOfBirth);
                    users[index].age = age;
                    let img = `${backendUrl}${usr.image}`;
                    return (
                      <tr key={usr._id} className="hover text-base">
                        <td className="avatar" onClick={() => handleClick(usr)}>
                          <div className="w-10 rounded-full">
                            <img src={img} alt="" />
                          </div>
                        </td>
                        <td onClick={() => handleClick(usr)}>{usr.name}</td>

                        <td onClick={() => handleClick(usr)}>
                          {usr.phoneNumber}
                        </td>
                        <td onClick={() => handleClick(usr)}>{usr.email}</td>
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
        aria-describedby="modal-modal-description">
        <Box
          className="border-none bg-base-100 shadow-2xl px-6 py-7 rounded-2xl min-w-[300px] md:min-w-[650px]"
          sx={style}>
          <div className="flex gap-6 items-center" id="modal-modal-title">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={`${backendUrl}${user?.image}`} alt="usr image" />
              </div>
            </div>
            <p className="text-xl">{user?.name}</p>
          </div>
          <Box id="modal-modal-description" sx={{ mt: 4 }}>
            <Box className="flex flex-col gap-5">
              <Box className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Email</label>
                  <input
                    defaultValue={user?.email}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>

                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">Phone Number</label>
                  <input
                    defaultValue={user?.phoneNumber}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>
              </Box>

              <Box className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="flex flex-col w-[47%]">
                  <label className="ps-2">User Id</label>
                  <input
                    defaultValue={user?._id}
                    type="text"
                    className="input input-bordered focus:outline-none w-full"
                  />
                </div>
                <div>
                  <Link
                    to={`/user/${user?._id}`}
                    className="btn btn-outline btn-info mt-5 w-36 rounded-lg me-5 border text-lg">
                    View
                  </Link>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AllUsers;
