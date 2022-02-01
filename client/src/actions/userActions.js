import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_BY_ID_REQUEST,
    USER_UPDATE_BY_ID_SUCCESS,
    USER_UPDATE_BY_ID_FAIL,
} from "../constants/userConstants";
import { toast } from "react-toastify";

export const userLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));

        toast.success("You are logged in!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });

        toast.error(e.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

export const userLogout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem("userInfo");
};

export const userRegisterAction =
    (name, email, password) => async (dispatch) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/users/register",
                { name, email, password },
                config
            );

            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            localStorage.setItem("userInfo", JSON.stringify(data));

            toast.success("User created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message,
            });

            toast.error(e.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

export const userDetailsAction = (id) => async (dispatch, getState) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const userUpdateAction = (user) => async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

        toast.success("Profile updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } catch (e) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const userListAction = () => async (dispatch) => {
    dispatch({ type: USER_LIST_REQUEST });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.get("/api/users", config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const userDeleteAction = (id) => async (dispatch) => {
    dispatch({ type: USER_DELETE_REQUEST });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const {
            data: { message },
        } = await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: USER_DELETE_SUCCESS, payload: message });
    } catch (e) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const userUpdateByIdAction = (id, user) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_BY_ID_REQUEST });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.put(`/api/users/${id}`, user, config);

        dispatch({ type: USER_UPDATE_BY_ID_SUCCESS, payload: data });

        toast.success("User updated successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } catch (e) {
        dispatch({
            type: USER_UPDATE_BY_ID_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });

        toast.error(e.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};
