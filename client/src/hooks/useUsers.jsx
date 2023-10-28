import { useMutation, useQuery } from "react-query";
import Axios from "../axios";

const getAuserById = (id) => {
  // console.log(id);

  return Axios({
    method: "GET",
    url: `/users/${id}`,
  });
};

const adduser = (user) => {
  return Axios(
    {
      method: "POST",
      url: "/user/add",
      data: user,
    },
    { withCredentials: true }
  );
};

const deleteuser = (id) => {
  return Axios(
    {
      method: "DELETE",
      url: `/user/delete/${id}`,
    },
    { withCredentials: true }
  );
};

export const updateuser = ({ id, data }) => {
  console.log(data, id);
  return Axios(
    {
      method: "PUT",
      url: `/user/update/${id}`,
      data: data,
    },
    { withCredentials: true }
  );
};

export const useAdduser = () => {
  return useMutation(adduser);
};

export const useGetAlluser = () => {
  return useQuery(
    "getAlluser",
    () =>
      Axios({
        method: "GET",
        url: "/users/allusers",
      }),
    {
      // refetchInterval: 1000,
      staleTime: 0,
    }
  );
};

export const useGetAuserById = (id) => {
  return useQuery("getAuserById", () => getAuserById(id));
};

export const useDeleteuser = () => {
  return useMutation(deleteuser);
};
