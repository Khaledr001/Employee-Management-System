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

const addEmployee = (employee) => {
  return Axios(
    {
      method: "POST",
      url: "/employee/add",
      data: employee,
    },
    { withCredentials: true }
  );
};

const deleteEmployee = (id) => {
  return Axios(
    {
      method: "DELETE",
      url: `/employee/delete/${id}`,
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

export const useAddEmployee = () => {
  return useMutation(addEmployee);
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

export const useDeleteEmployee = () => {
  return useMutation(deleteEmployee);
};
