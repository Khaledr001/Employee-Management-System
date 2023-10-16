import { useFormik } from "formik";
import { MdEdit } from "react-icons/md";
import {
  useAddCatagory,
  useDeleteCatagory,
  useGetAllCatagory,
} from "../../../hooks/useCatagory";
import Loading from "../../../components/Loading";

const AllCategory = () => {
  const addCatagoryResponse = useAddCatagory();
  const catagoryResponse = useGetAllCatagory();
  const deleteCatagoryResponse = useDeleteCatagory();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
    },
    // validationSchema: productSchema.addProduct,
    onSubmit: async (values) => {
      //   console.log(values);
      addCatagoryResponse.mutate(values);
      // console.log(productResponse.data?.data);
    },
  });

  const catagory = catagoryResponse.data?.data.payload.catagory;
  //   console.log(catagory);

  const handleDelete = (slug) => {
    const sure = window.confirm("Are you sure you want to delete this item?");
    if (sure) {
      console.log(slug);
      deleteCatagoryResponse.mutate(slug);
    }

    console.log(catagoryResponse.data?.data);
  };

  if (addCatagoryResponse.isSuccess || deleteCatagoryResponse.isSuccess) {
    // console.log(addCatagoryResponse.data);
    window.location.reload();
  }
  if (addCatagoryResponse.isLoading || deleteCatagoryResponse.isLoading)
    return <Loading />;
  return (
    <>
      <div className="px-5 w-full h-20 bg-base-200 flex justify-between items-center rounded-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  md:ms-5 lg:ms-5">
          All Category
        </h1>
        <h1 className="text-lg lg:text-xl text-success font-bold md:me-5 lg:me-5">
          Total Category : {catagory?.length}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-8">
        <div className=" lg:w-[30%] max-h-[250px] bg-base-200 rounded-lg p-5 ">
          <h1 className="text-xl font-bold text-info mb-6">Add New Category</h1>
          <form onSubmit={handleSubmit} action="">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name">Catagory Name *</label>
              <input
                onChange={handleChange}
                type="text"
                className="input input-info focus:outline-none text-lg focus:border-2"
                name="name"
                value={values.name}
                required
              />
            </div>

            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="btn rounded-xl btn-success btn-outline mt-7">
                {" "}
                Add Category
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-[70%] py-3 border border-info rounded-lg">
          <div className="overflow-x-auto mx-3">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-300 text-base">
                  <th>CATEGORY ID</th>
                  <th>NAME</th>
                  <th>SLUG</th>
                  {/* <th>TOTAL SELL</th> */}
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {catagory?.map((item) => {
                  return (
                    <tr key={item.slug} value={item.slug} className="hover">
                      <td>{item._id}</td>
                      <td>{item.catagoryName}</td>
                      <td>{item.slug}</td>
                      {/* <td>{item.catagoryName}</td> */}
                      <td className="flex gap-1">
                        {" "}
                        <div className="btn btn-sm btn-info btn-outline rounded-3xl me-1">
                          <MdEdit />
                          <p className="text-xs">Edit</p>
                        </div>
                        <button
                          value={item.slug}
                          onClick={() => handleDelete(item.slug)}
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
    </>
  );
};

export default AllCategory;
