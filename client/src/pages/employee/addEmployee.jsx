import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useRef } from "react";
import { useGetAllCatagory } from "../../../hooks/useCatagory";
import productSchema from "../../schema/product";
import { useAddProduct } from "../../../hooks/useProduct";

const AddProduct = () => {
  const hiddenFileInput = useRef(null);
  const productResponse = useAddProduct();

  const { data } = useGetAllCatagory();
  const allCatagory = data?.data.payload;
  //   console.log(allCatagory);

  const { values, setFieldValue, errors, handleChange, handleSubmit } =
    useFormik({
      initialValues: {},
      validationSchema: productSchema.addProduct,
      onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("image", values.image);
        formData.append("name", values.name);
        formData.append("catagory", values.catagoryId);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);
        formData.append("description", values.description);
        formData.append("shippingCost", values.shippingCost);

        // console.log(formData.get('name'));
        for (var pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        console.log(values.name);
        productResponse.mutate(formData);
        console.log(productResponse.data?.data);
      },
    });

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  if (productResponse.isSuccess) {
    window.location.reload();
    // window.alert('You product was successfully added');
  }

  return (
    <>
      <div>
        <div className="px-5 w-full h-20 bg-base-200 flex justify-between items-center rounded-md">
          <h1 className="text-4xl font-bold ">Product Editor</h1>
          <Link className="btn btn-info">all products</Link>
        </div>

        <div className="w-full bg-base-200 flex mt-5 py-8 px-5 rounded-md">
          <div className="w-full">
            {/* <ImageUpload /> */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-10 md:flex-row  lg:flex-row justify-center items-start">
                <div>
                  <h1 className="text-xl text-info mb-5 ms-2">Product Image</h1>
                  <div className="border-2 border-dashed border-info rounded-md p-2 flex flex-col justify-center items-center h-[330px] w-[300px]">
                    <label
                      htmlFor="image"
                      className="text-lg font-bold cursor-pointer mb-1">
                      {values.image ? values.image.name : "Choose an image"}
                    </label>
                    <div
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                      className="w-full h-full flex justify-center items-center">
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          alt="upload image"
                          className="w-full"
                        />
                      ) : null}
                      <input
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
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.image}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="w-full">
                  <h1 className="text-xl text-info mb-5">
                    Product Information
                  </h1>
                  <div className="flex flex-col lg:flex-row md:flex-row justify-start gap-8">
                    <div className="flex flex-col gap-1 w-[60%]">
                      <label htmlFor="name">Product Name *</label>
                      <input
                        onChange={handleChange}
                        type="text"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="name"
                        required
                      />
                      {errors.name ? (
                        <p className="text-error text-sm ms-2 mt-1">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-[40%] min-w-[150px]">
                      <label htmlFor="catagory">Select Catagory *</label>
                      <select
                        onChange={(e) =>
                          setFieldValue("catagoryId", e.target.value)
                        }
                        name="catagory"
                        id="catagory"
                        className="input input-info focus:outline-none text-lg focus:border-2">
                        <select name="" id="">
                          Select a Catagory
                        </select>
                        {allCatagory?.catagory.map((element) => {
                          return (
                            <option key={element.slug} value={element.slug}>
                              {element.catagoryName}
                            </option>
                          );
                        })}
                      </select>
                      {errors.catagoryId ? (
                        <p className="text-error text-sm ms-2 mt-1">
                          {errors.catagoryId}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row md:flex-row justify-start gap-8 mt-5">
                    <div className="flex flex-col gap-1 w-[50%]">
                      <label htmlFor="price">Price *</label>
                      <input
                        onChange={handleChange}
                        type="number"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="price"
                        required
                      />
                      {errors.price ? (
                        <p className="text-error text-sm ms-2 mt-1">
                          {errors.price}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-[50%]">
                      <label htmlFor="quantity">Quantity *</label>
                      <input
                        onChange={handleChange}
                        type="number"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="quantity"
                        required
                      />
                      {errors.quantity ? (
                        <p className="text-error text-sm ms-2 mt-1">
                          {errors.quantity}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-[40%] mt-5">
                    <label htmlFor="shippingCost">Shipping Cost *</label>
                    <input
                      onChange={handleChange}
                      type="number"
                      className="input input-info focus:outline-none text-lg focus:border-2"
                      name="shippingCost"
                      required
                    />
                    {errors.shippingCost ? (
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.shippingCost}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="description">Full details *</label>
                      <textarea
                        onChange={handleChange}
                        rows={5}
                        required
                        name="description"
                        className="textarea input-info focus:outline-none text-lg focus:border-2"
                        placeholder=""></textarea>
                      {errors.description ? (
                        <p className="text-error text-sm ms-2 mt-1">
                          {errors.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-end me-8 mt-5">
                <button
                  className="btn btn-lg rounded-3xl btn-success btn-outline"
                  type="submit">
                  Add product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
