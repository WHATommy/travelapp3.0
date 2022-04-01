import axios from "axios";
import baseUrl from "../utilsServer/baseUrl";
import catchErrors from "../utils/catchErrors";
import Router from "next/router";
import cookie from "js-cookie";

export const createTrip = async(trip, setError, handleTripForm) => {
    try {
        const res = await axios.post(`${baseUrl}/api/trip/`, trip, { headers: { "token":  cookie.get("token") } });
        handleTripForm();
        if (res) window.alert("Trip created!")
    }
    catch (err) {
        const errors = catchErrors(err);
        console.log(errors);
        setError(errors);
    }
}