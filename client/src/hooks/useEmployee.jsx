import { useMutation, useQuery } from "react-query";
import Axios from "../axios";

const getAllEmployee = () => {
  return Axios({
    method: "GET",
    url: "/employee/all",
  });
};

const getAEmployeeById = (id) => {
  // console.log(id);
  
  return Axios({
    method: "GET",
    url: `/employee/${id}`,
  });
};

const addProduct = (product) => {
  return Axios(
    {
      method: "POST",
      url: "/product/add",
      data: product,
    },
    { withCredentials: true }
  );
};

const deleteProduct = (id) => {
  return Axios(
    {
      method: "DELETE",
      url: `/product/${id}`,
    },
    { withCredentials: true }
  );
};

const updateProduct = (id, updatedProduct) => {
  return Axios(
    {
      method: "PUT",
      url: `/product/${id}`,
      data: updatedProduct,
    },
    { withCredentials: true }
  );
};

const getAProduct = (id) => {
  return Axios(
    {
      method: "GET",
      url: `/product/${id.id}`,
    },
    { withCredentials: true }
  );
};

export const useAddProduct = () => {
  return useMutation(addProduct);
};

export const useGetAllEmployee = () => {
  return useQuery("getAllEmployee", getAllEmployee);
};

export const useGetAEmployeeById = (id) => {
  // console.log(id);
  return useQuery("getAEmployeeById", () => getAEmployeeById(id));
}

export const useUpdateProduct = () => {
  return useMutation(updateProduct);
};

export const useDeleteProduct = () => {
  return useMutation(deleteProduct);
};

export const useGetAProduct = () => {
  return useQuery('getAProduct', getAProduct);
}


// export {useGetAllEmployee}