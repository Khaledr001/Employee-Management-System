import Axios from "../axios";
import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";
// const loginUrl = import.meta.env.VITE_USER_LOGIN;

const _clearCredentials = () => {
    delete Axios.defaults.headers.common["Authorization"];
    Cookies.remove(TOKEN_KEY);
};

const LogIn = (data) => {
    try {
        const { user, accessToken } = data.payload;
        console.log(user, accessToken);

        // set access token to cookies and set user to local storage
        if (accessToken) {
            Axios.defaults.headers.common["Authorization"] = accessToken;
            Cookies.set(TOKEN_KEY, accessToken);
            localStorage.setItem("user", JSON.stringify(user));
            // localStorage.setItem("accessToken", JSON.stringify(accessToken));

        } else {
            _clearCredentials();
        }
        window.location.reload();
    } catch (error) {
        alert("Login failed!!");
    }
};

const isUserLoggedIn = () => Boolean(Cookies.get(TOKEN_KEY));

const performLogout = () => {
    _clearCredentials();
    window.location.reload();
};

const getAuthToken = () => Cookies.get(TOKEN_KEY);

const authServices = { LogIn, isUserLoggedIn, performLogout, getAuthToken };

export default authServices;
