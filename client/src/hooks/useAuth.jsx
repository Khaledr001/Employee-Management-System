// import Cookies from "js-cookie"
import { useMutation } from "react-query";
import Axios from "../axios";
import authServices from "../services/authServices";

export const useAuth = () => {
    const isLogin = () => authServices.isUserLoggedIn();

    const onLogout = () => authServices.performLogout();

  return { isLogin, onLogout };
}

const logIn = (userData) => { 
    return (Axios.post('/auth/login', userData)
      .catch(function (error) {
        //   console.log(error.response.data.message);
          return Promise.reject(error.response);
  }))
}

const register = (userData) => { 
    return Axios({
        method: 'POST',
        url: '/users/register',
        data: userData,
    }, { withCredentials: true });
}

export const useUserLogin = () => { 
    return useMutation(logIn);
}

export const useUserRegister = () => { 
    return useMutation(register);
}
