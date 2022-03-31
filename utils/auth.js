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
    try {
        const res = await axios.post(`${baseUrl}/api/auth/`, {email: user.email, password: user.password});
        handleShowLogin(true);
        setToken(res.data);
    } catch (err) {
        const errors = catchErrors(err);
        console.log(errors);
        setError(errors);
    }
}

export const updateAccountInfo = async (username, email, setError) => {
    try {
        console.log(cookie.get("token"))
        const res = await axios.put(`${baseUrl}/api/user/`, {username: username, email: email}, { headers: { "token":  cookie.get("token") } });
        if(res) window.alert("Update successful!")
    }
    catch (err) {
        const errors = catchErrors(err);
        console.log(errors);
        setError(errors);
    }
}

const setToken = authToken => {
    cookie.set("token", authToken);
    Router.push("/dashboard");
}

export const redirectUser = (ctx, location) => {
    if(ctx.req) {
        ctx.res.writeHead(302, {Location: location});
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

export const handleLogout = () => {
    cookie.remove("token");
    Router.push("/");
}