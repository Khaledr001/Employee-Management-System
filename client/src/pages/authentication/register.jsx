import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import authSchema from "../../schemas";
import { useUserRegister } from "../../hooks/useAuth";
import ErrorPage from "../errorPage";
import Loading from "../../components/loading";

function Register() {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess, error } = useUserRegister();

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
    },
    validationSchema: authSchema.registerSchema,
    onSubmit: async (values) => {
      console.log(values);
      mutate(values);
    },
  });

  if (isSuccess) {
    // const response = data?.data;
    // authServices.LogIn(response);
    // console.log(data?.data.payload);
    navigate("/login", { replace: true });
  }

  if (error) return <ErrorPage />;

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col align-middle justify-center max-w-[30rem] m-auto bg-base-200 rounded-2xl shadow-2xl py-10 px-2 mb-12">
        <div className="py-5 w-full flex flex-col justify-center align-middle">
          <div className="m-auto w-[82%] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-[#fa773a]">Welcome !!!</h1>

            <p className="mt-5 text-xl text-info">Create your account here.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
            {/* Name */}
            <div className="w-[82%] m-auto rounded-md">
              <input
                className="input h-[45px] w-full rounded-lg px-4 text-md border border-info focus:outline-none focus:border-2"
                type="text"
                placeholder="Your name"
                required
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <p className="text-error text-sm ms-2 mt-1">{errors.name}</p>
              ) : null}
            </div>

            {/* email  */}
            <div className="w-[82%] m-auto rounded-md">
              <input
                className="input h-[45px] w-full rounded-lg px-4 text-md border border-info focus:outline-none focus:border-2"
                type="email"
                placeholder="Email"
                required
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <p className="text-error text-sm ms-2 mt-1">{errors.email}</p>
              ) : null}
            </div>

            {/* Phone Number  */}
            <div className="w-[82%] m-auto rounded-md">
              <input
                className="input h-[45px] w-full rounded-lg px-4 text-md border border-info focus:outline-none focus:border-2"
                type="text"
                placeholder="Phone Number"
                required
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phoneNumber && errors.phoneNumber ? (
                <p className="text-error text-sm ms-2 mt-1">
                  {errors.phoneNumber}
                </p>
              ) : null}
            </div>

            {/* password  */}
            <div className="w-[82%] m-auto">
              <input
                className="input h-[45px] w-full rounded-lg px-4 text-md border border-info focus:outline-none focus:border-2"
                type="password"
                placeholder="Password"
                required
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <p className="text-error text-sm ms-2 mt-1">
                  {errors.password}
                </p>
              ) : null}
            </div>

            {/* Confirm password  */}
            <div className="w-[82%] m-auto">
              <input
                className="input h-[45px] w-full rounded-lg px-4 text-md border border-info focus:outline-none focus:border-2"
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <p className="text-error text-sm ms-2 mt-1">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <div className="m-auto mt-6 w-[82%] ">
              <button
                type="submit"
                className="btn btn-info h-[40px] w-full text-textcolor text-center "
                disabled={isSubmitting}>
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="mt-5 w-full px-5">
          <div className="w-[80%] m-auto flex justify-between items-center text-info text-md">
            <div>
              <p>Are you already a member?</p>
            </div>
            <div>
              <Link
                to={"/login"}
                className="btn btn-accent border rounded-xl hover:scale-105 duration-300">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
