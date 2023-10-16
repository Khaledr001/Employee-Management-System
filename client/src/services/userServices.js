import Axios from "../axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");

const updateUser = async (updatedData, id) => {
  try {
    const url = `/users/update/${id}`;
    console.log(url);
    //   const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
    const response = await Axios(
      {
        method: "put",
        url: url,
        data: updatedData,
        headers: {
          accessToken: accessToken,
        },
      },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log(data);
    const { user } = data.payload;
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

const getAddress = async () => {
  try {
    const response = await Axios(
      {
        method: "get",
        url: "/user/address/all",
        headers: {
          accessToken: accessToken,
        },
      },
      {
        withCredentials: true,
      }
    );

    const data = response.data;
    const { addresses } = data.payload;
    console.log(addresses);
    return addresses;
  } catch (error) {
    console.log(error);
  }
};

const userServices = { updateUser, getAddress };

export default userServices;
