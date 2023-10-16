import { MdEdit } from "react-icons/md";

// export const ProductCard1 = ({ product }) => {
//   const imgPath = `http://localhost:6001${product.image}`;
//   console.log(imgPath);
//   return (
//     <div className="w-[245px] bg-base-200 shadow-2xl grid gap-2 p-5 rounded-md hover:scale-105 transition">
//       <div className="">
//         <img
//           className="overflow-hidden rounded-lg h-[200px] w-[230px]"
//           src={imgPath}
//           alt="product image"
//         />
//       </div>
//       <div>
//         <p className="text-xl font-semibold mt-2">{product.name} </p>
//       </div>
//       <div>
//         <p className="text-lg font-semibold text-success">
//           Available : {product.quantity}{" "}
//         </p>
//       </div>
//       <div>
//         <p className="text-lg font-semibold text-info">
//           Already Sold : {product.sold}{" "}
//         </p>
//       </div>
//       <div>
//         <p className="text-lg font-semibold ">Price : {product.price} </p>
//       </div>

//       <div className="flex justify-between mt-2">
//         <div className="btn h-10 w-[90px] btn-sm btn-info btn-outline rounded-3xl">
//           <MdEdit />
//           <span>Edit</span>
//         </div>
//         <div className="btn h-10 w-[90px] btn-sm btn-error btn-outline rounded-3xl">
//           delete
//         </div>
//       </div>
//     </div>
//   );
// };

export const ProductCard = ({product}) => {
  const imgPath = `http://localhost:6001${product.image}`;
  console.log(imgPath);
  return (
    <div
      className=" flex flex-col h-full rounded-lg bg-base-200 p-4"
      style={{
        opacity: "1",
        transform: "translateY(0px)",
        transition: "box-shadow var(--transition)",
      }}>
      <div className="flex items-start gap-[14px] mb-2.5">
        <div className="overflow-hidden rounded-lg bg-white border-solid border border-[#354585] flex flex-1 items-center justify-center">
          <img src={imgPath} alt="Product Image" />
        </div>
        {/* <button className="" aria-label="Open submenu">
          <i className="icon icon-ellipsis-vertical-solid text-[24px]"></i>
        </button> */}
      </div>
      <a
        className="text-lg !leading-[1.4] block max-w-[180px] transition hover:text-[#4F89FC] "
        href="/product-editor">
        {product.name}
      </a>
      <div className="flex flex-col flex-1 gap-2.5 mt-2.5">
        <p className="font-heading font-bold text-sm leading-[1.4] text-green-400">
          Available : {product.quantity}
        </p>
        <p className="font-heading font-bold text-sm leading-[1.4] text-[#4F89FC]">
          Already sold : {product.sold}
        </p>
        <p className="font-heading font-bold text-sm leading-[1.4]">
          Regular price : {product.price}
        </p>
      </div>
      {/* <div className="">
        <a
          className=" btn btn-outline btn-info !text-sm"
          href="/product-editor">
          <MdEdit /> <span>Edit</span>
        </a>
        <button className="btn btn--outline red !text-sm">Delete</button>
      </div> */}

      <div className="grid grid-cols-2 gap-1 mt-4">
        <div className="min-w-[78px] btn btn-sm btn-info btn-outline rounded-3xl">
          <MdEdit />
          <span>Edit</span>
        </div>
        <div className="btn btn-sm btn-error btn-outline rounded-3xl !text-sm">
          delete
        </div>
      </div>
    </div>
  );
};


