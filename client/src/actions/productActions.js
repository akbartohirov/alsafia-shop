import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from "../constants/productListConstants";
import { toast } from "react-toastify";

export const listProduct =
    (keyword = "", pageNumber = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });

            const { data } = await axios.get(
                `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
            );

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload:
                    e.response && e.response.data.message
                        ? e.response.data.message
                        : e.message,
            });
        }
    };

export const listProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};

export const productDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });
        const { token } = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });

        toast.success("Product deleted", {
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
            type: PRODUCT_DELETE_FAIL,
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

export const productCreate = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });
        const { token } = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`/api/products/`, {}, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });

        toast.success("Product deleted", {
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
            type: PRODUCT_CREATE_FAIL,
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

export const productUpdate = (product) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });
        const { token } = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });

        toast.success("Product updated", {
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
            type: PRODUCT_UPDATE_FAIL,
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

export const productReview = (id, review) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST });
        const { token } = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.put(`/api/products/${id}/review`, review, config);

        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
        });

        toast.success("Your review is added", {
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
            type: PRODUCT_REVIEW_FAIL,
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

export const listTopProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });

        const { data } = await axios.get(`/api/products/top`);

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data,
        });
    } catch (e) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                e.response && e.response.data.message
                    ? e.response.data.message
                    : e.message,
        });
    }
};
