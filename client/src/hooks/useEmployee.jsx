import { useMutation, useQuery } from "react-query";
import Axios from "../axios";


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

export const updateEmployee = ({id, data}) => {
  console.log(data, id);
  return Axios(
    {
      method: "PUT",
      url: `/employee/update/${id}`,
      data: data,
    },
    { withCredentials: true }
  );
};

export const useAddEmployee = () => {
  return useMutation(addEmployee);
};

export const useGetAllEmployee = (option) => {
  return useQuery(
    "getAllEmployee",
    () =>
      Axios({
        method: "GET",
        url: "/employee/all",
        params: {
          search: option,
        },
      }),
    {
      // refetchInterval: 1000,
      staleTime: 0,
    }
  );
};

export const useGetAEmployeeById = (id) => {
  return useQuery("getAEmployeeById", () => getAEmployeeById(id));
};


export const useDeleteEmployee = () => {
  return useMutation(deleteEmployee);
};
