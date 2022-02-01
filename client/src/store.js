import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateByIdReducer,
} from "./reducers/userReducer";

//reducers
import {
    productListReducer,
    productDetailReducer,
    productDeleteReducer,
    productCreateReducer,
    product1UpdateReducer,
    productReviewReducer,
    productTopReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: product1UpdateReducer,
    productTop: productTopReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdateById: userUpdateByIdReducer,
    productReview: productReviewReducer,
});

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromLocalstorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    cart: {
        cartItems,
    },

    userLogin: {
        userInfo: userInfoFromLocalstorage,
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
