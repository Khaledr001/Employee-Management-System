// import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useGetAllProducts } from "../../../hooks/useProduct";
import {ProductCard} from "../../components/productCard";
import { useGetAllCatagory } from "../../../hooks/useCatagory";
import { useState } from "react";

const AllProducts = () => {
  const { data, isLoading } = useGetAllProducts();
  console.log(data);
  const allProducts = data?.data.payload;

  const [catagory, setCatagory] = useState("All Products");
  const catagories = useGetAllCatagory();
  const allCatagory = catagories?.data?.data.payload;

  if (isLoading) <Loading />;
  return (
    <>
      <div className="px-5 w-full h-20 bg-base-200 flex justify-between items-center rounded-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  md:ms-5 lg:ms-5">
          All Products Grid
        </h1>
        <h1 className="text-lg lg:text-xl text-success font-bold md:me-5 lg:me-5">
          Total Product : {allProducts?.products.length}
        </h1>
      </div>

      <div className="flex justify-between items-center h-16 mt-5 gap-8">
        <div className=" h-full">
          <h1 className="text-base mg:text-xl lg:text-xl h-full btn cursor-default bg-base-200">
            {catagory}
          </h1>
        </div>

        <div className="">
          <div className="flex flex-col gap-1 w-[100%] min-w-[240px] md:min-w-[350px] lg:min-w-[350px]">
            <select
              onChange={(e) => setCatagory(e.target.value)}
              name="catagory"
              id="catagory"
              className="input input-info focus:outline-none text-lg">
              <option disabled selected>
                Select a Catagory
              </option>
              {allCatagory?.catagory.map((element) => {
                return (
                  <option key={element.slug} value={element.catagoryName}>
                    {element.catagoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-12 grid flex-1 items-start gap-[26px] mb-[30px] sm:grid-cols-2 md:grid-cols-3 md:mt-7 lg:grid-cols-4 2xl:grid-cols-6">
        {allProducts?.products.map((product) => {
          return (
            <div
              key={product.slug}
              className="transform transition duration-500 hover:scale-105 ">
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
