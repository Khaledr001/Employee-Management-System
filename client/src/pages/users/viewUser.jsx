import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../../../secrete";
import Loading from "../../components/loading";
import { useGetAuserById } from "../../hooks/useUsers";

const ViewUser = () => {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isSuccess, isError, error } = useGetAuserById(id);

  if (isLoading) return <Loading />;
  if (isError) {
    console.log(error);
  }

  let user;
  if (isSuccess) {
    user = data?.data.payload.user;
  }

  return (
    <>
      <div className="p-1 ">
        <div className="px-5 flex flex-col md:flex-row gap-7 w-full md:h-20 py-3 bg-base-200 justify-between items-center rounded-md">
          <h1 className="text-4xl font-bold ">user Profile</h1>
          <Link to="/all-users" className="btn btn-info">
            all users
          </Link>
        </div>

        <div className=" flex flex-col mt-10 gap-14 ">
          <div className="w-full flex flex-col lg:flex-row  items-center bg-base-200 rounded-xl py-3 hover:shadow-xl">
            <div
              className="flex flex-col lg:flex-row md:w-[50%] gap-8 m-4 py-5 ps-4 pe-5  items-start border-b-2 lg:border-b-0 lg:border-e-2 border-info border-dashed"
              id="modal-modal-title">
              <div className="avatar">
                <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`${backendUrl}${user?.image}`} alt="user image" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">{user?.name}</p>

                <p className="mt-2 font-semibold">user ID : {user?._id}</p>
              </div>
            </div>

            <div className="p-5 lg:ps-8 md:w-[50%]">
              <div>
                <ul className="flex w-full flex-col gap-3 ">
                  <li className="flex">
                    <p className="w-[30%]">Phone :</p>
                    <p className="w-[70%] text-info">{user?.phoneNumber}</p>
                  </li>
                  <li className="flex">
                    <p className="w-[30%]">Email :</p>
                    <p className="text-info">{user?.email}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
