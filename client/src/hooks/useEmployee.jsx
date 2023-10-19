import { useMutation, useQuery } from "react-query";
import Axios from "../axios";

const getAllEmployee = () => {
  return Axios({
    method: "GET",
    url: "/employee/all",
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
      url: `/product/${id}`,
    },
    { withCredentials: true }
  );
};

const useAddProduct = () => {
  return useMutation(addProduct);
};

export const useGetAllEmployee = () => {
  return useQuery("getAllEmployee", getAllEmployee);
};

const useUpdateProduct = () => {
  return useMutation(updateProduct);
};

const useDeleteProduct = () => {
  return useMutation(deleteProduct);
};

const useGetAProduct = () => {
  return useQuery('getAProduct', getAProduct);
}


// export {useGetAllEmployee}