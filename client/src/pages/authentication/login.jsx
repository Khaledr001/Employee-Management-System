/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import { useUserLogin } from "../../hooks/useAuth";
import authSchema from "../../schemas";
import authServices from "../../services/authServices";
import ErrorPage from "../errorPage";

function Login() {
  const navigate = useNavigate();

  const { mutate, isSuccess, isLoading, isError, data, error } = useUserLogin(); 

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
      email: "",
      password: "",
    },
    validationSchema: authSchema.loginSchema,
    onSubmit: async (values) => {
      mutate(values);
      // console.log(data?.data);
    },
  });

  if (isLoading) return <Loading />;
  
  if (isError) { 
    // console.log(error)
    if(error.status != 404 && error.status != 401) return <ErrorPage />;
  }
  
  if (isSuccess) {
    const response = data?.data;
    authServices.LogIn(response);
    // console.log(data);
    navigate("/", { replace: true });
  }

  return (
    <>
      <div className="flex flex-col align-middle justify-center max-w-md m-auto bg-base-200 rounded-2xl shadow-2xl py-10 px-2 mb-12">
        <div className="py-5 w-full flex flex-col justify-center align-middle">
          <div className="m-auto w-[82%] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-[#fa773a]">Login</h1>

            <p className="mt-5 text-md text-info">
              Are you already a member? Please Log-In
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
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

            {error?.data.message && 
              <div className="w-[82%] m-auto">
                <p className="text-error text-base ms-2 mt-1">{error.data.message}</p>
              </div>                
              }

            <div className="m-auto mt-6 w-[82%] ">
              <button
                type="submit"
                className="btn btn-info h-[40px] w-full text-textcolor text-center "
                disabled={isSubmitting}>
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 w-full px-5">
          <div className="w-[80%] h-10 m-auto border-b border-[#002D74]">
            <Link className="text-info hover:text-orange-600 ">
              Forgote your password?
            </Link>
          </div>

          <div className="w-[80%] m-auto mt-5 flex justify-between items-center text-info text-md">
            <div>
              <p>Don't have any account?</p>
            </div>
            <div>
              <Link
                to={"/register"}
                className="btn btn-accent border rounded-xl hover:scale-105 duration-300">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
