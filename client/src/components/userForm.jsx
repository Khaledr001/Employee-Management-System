import { useFormik } from "formik";
import { useRef } from "react";

const UserEdit = ({ user }) => {
  const hiddenFileInput = useRef(null);
  //   const productResponse = useAddProduct();

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      ...user,
    },
    // validationSchema: productSchema.addProduct,
    onSubmit: async (values) => {
      // const formData = new FormData();
      // formData.append("image", values.image);
      // formData.append("name", values.name);
      // console.log(formData.get('name'));
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      //   console.log(values);
      // productResponse.mutate(formData);
      // console.log(productResponse.data?.data);
    },
  });

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  //   if (productResponse.isSuccess) {
  //     window.location.reload();
  //     // window.alert('You product was successfully added');
  //   }
  return (
    <div>
      <div className="w-full bg-base-200 flex mt-5 py-8 px-5 rounded-md">
        <div className="w-full">
          {/* <ImageUpload /> */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-10 md:flex-row  lg:flex-row justify-center items-start">
              <div className="ps-2 flex flex-col justify-center items-center">
                <h1 className="text-xl text-info mb-5 ms-2">Profile Picture</h1>
                <div className="avatar p-2 flex flex-col justify-center items-center ">
                  <div
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                    className="w-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden  h-full flex justify-center items-center">
                    {values.image ? (
                      <img
                        src={"http://localhost:6001/" + values.image}
                        alt="upload image"
                        className="img-circle overflow-hidden"
                      />
                    ) : (
                      <img
                        src='/images/defaultprofile.png'
                        alt="user image"
                        className="img-circle overflow-hidden"
                      />
                    )}
                    <input
                      className="overflow-hidden"
                      name="image"
                      type="file"
                      hidden
                      ref={hiddenFileInput}
                      onChange={(e) =>
                        setFieldValue("image", e.target.files[0])
                      }
                    />
                  </div>
                  {errors.image ? (
                    <p className="text-error text-sm ms-2 mt-3">
                      {errors.image}
                    </p>
                  ) : null}
                </div>
                <label
                  htmlFor="image"
                  className=" mt-2 text-lg font-bold cursor-pointer ">
                  {values.image ? values.image.name : "Choose an image"}
                </label>
              </div>

              <div className="w-full">
                <h1 className="text-xl text-info mb-5">User Information</h1>
                <div className="flex flex-col md:flex-row justify-start gap-8">
                  <div className="flex flex-col gap-1 w-[50%]">
                    <label htmlFor="name">Name *</label>
                    <input
                      onChange={handleChange}
                      value={values.name}
                      type="text"
                      className="input input-info focus:outline-none text-lg focus:border-2"
                      name="name"
                    />
                    {errors.name ? (
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1 w-[50%]">
                    <label htmlFor="name">Email *</label>
                    <input
                      value={values.email}
                      onChange={handleChange}
                      type="text"
                      className="input input-info focus:outline-none text-lg focus:border-2"
                      name="email"
                    />
                    {errors.email ? (
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row md:flex-row justify-start gap-8 mt-5">
                  <div className="flex flex-col gap-1 w-[50%]">
                    <label htmlFor="price">Phone Number *</label>
                    <input
                      value={values.phoneNumber}
                      onChange={handleChange}
                      type="text"
                      className="input input-info focus:outline-none text-lg focus:border-2"
                      name="phoneNumber"
                    />
                    {errors.phoneNumber ? (
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.phoneNumber}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1 w-[40%]">
                    <label htmlFor="role">Role *</label>
                    <select
                      //   onChange={(e) => setFieldValue("role", e.target.value)}
                      name="role"
                      id="role"
                      className="input input-info focus:outline-none text-lg focus:border-2">
                      <option name="" id="">
                        {values.role === "admin" ? "Admin" : "Customer"}
                      </option>
                      <option name="" id="">
                        {values.role === "admin" ? "Customer" : "Admin"}
                      </option>
                    </select>
                    {errors.role ? (
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.role}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[40%] mt-5">
                  <label htmlFor="shippingCost">Status *</label>
                  <input
                    value={values.isBaned ? "Banned" : "Active"}
                    onChange={handleChange}
                    type="text"
                    className="input input-info focus:outline-none text-lg focus:border-2"
                    name="status"
                  />
                  {errors.status ? (
                    <p className="text-error text-sm ms-2 mt-1">
                      {errors.status}
                    </p>
                  ) : null}
                </div>
                <div className="mt-5"></div>
              </div>
            </div>

            <div className="self-end me-8 mt-5">
              <button
                className="btn btn-lg rounded-3xl btn-success btn-outline"
                type="submit">
                Update this user
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
