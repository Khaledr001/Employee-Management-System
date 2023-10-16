import * as Yup from "yup";
// import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import Axios from "../../../axios";
import UserEdit from "../../components/userForm";

const UpdateUser = () => {
  const [isUser, setIsuser] = useState(false);
  const [user, setUser] = useState({});

  const search = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please enter your email address"),
    }),
    onSubmit: async (values) => {
      const searchUser = await Axios(
        {
          method: "GET",
          url: `/users`,
          params: {
            email: values.email,
          },
        },
        { withCredentials: true }
      );

      const data = searchUser?.data.payload.user;
      setIsuser(true);
      setUser(data);
      // console.log(user);
    },
  });

  return (
    <>
      <div className="pe-5 w-full mb-10 flex flex-col gap-5 md:flex-row justify-between items-center rounded-md">
        <div className=" h-full">
          <h1 className="h-16 px-7 text-base mg:text-xl lg:text-xl  btn cursor-default bg-base-200">
            Update User
          </h1>
        </div>
        <form onSubmit={search.handleSubmit} action="">
          <div className="join ">
            <div className="md:min-w-[350px]">
              <input
                onChange={search.handleChange}
                type="email"
                className="w-full join-item input input-info focus:outline-none text-lg focus:border-2 "
                name="email"
                required
                placeholder="Search user by email address"
              />
            </div>
            <div className="indicator">
              <button
                type="submit"
                className="btn join-item btn-info  btn-outline">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>{isUser && <UserEdit user={user} />}</div>
    </>
  );
};

export default UpdateUser;
