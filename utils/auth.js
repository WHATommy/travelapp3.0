import axios from "axios";
import baseUrl from "../utilsServer/baseUrl";
import catchErrors from "../utils/catchErrors";
import Router from "next/router";
import cookie from "js-cookie";

export const registerUser = async (user, setError, handleShowSignUp) => {
    try {
        const res = await axios.post(`${baseUrl}/api/signup/`, user);
        handleShowSignUp(true);
        setToken(res.data);
    } catch (err) {
        const errors = catchErrors(err);
        setError(errors);
    }
}

export const loginUser = async (user, setError, handleShowLogin) => {
    console.log(user)
    try {
        const res = await axios.post(`${baseUrl}/api/auth/`, {email: user.email, password: user.password});
        handleShowLogin(true);
        setToken(res.data);
    } catch (err) {
        const errors = catchErrors(err);
        console.log(errors)
        setError(errors);
    }
}

const setToken = authToken => {
    cookie.set("auth-token", authToken);
    Router.push("/");
}