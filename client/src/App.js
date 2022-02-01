import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/homepage/HomePage";
import ProductPage from "./pages/productpage/ProductPage";
import CartPage from "./pages/cartpage/CartPage";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import UserListPage from "./pages/adminpages/userlistpage/UserListPage";
import ProductListPage from "./pages/adminpages/productlistpage/ProductListPage";
import OrderListPage from "./pages/adminpages/orderlistpage/OrderListPage";
import UserEditPage from "./pages/adminpages/usereditpage/UserEditPage";
import ProductEditPage from "./pages/adminpages/producteditpage/ProductEditPage";

const App = () => {
    const { userInfo } = useSelector((state) => state.userLogin);
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/search/:keyword">
                        <HomePage />
                    </Route>
                    <Route exact path="/page/:pageNumber">
                        <HomePage />
                    </Route>
                    <Route exact path="/search/:keyword/page/:pageNumber">
                        <HomePage />
                    </Route>
                    <Route path="/product/:id">
                        <ProductPage />
                    </Route>
                    <Route path="/cart">
                        <CartPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/profile">
                        <ProfilePage />
                    </Route>
                    {userInfo?.user.isAdmin && (
                        <>
                            <Route path="/admin/user/:id">
                                <UserEditPage />
                            </Route>

                            <Route path="/admin/userlist">
                                <UserListPage />
                            </Route>

                            <Route path="/admin/productlist">
                                <ProductListPage />
                            </Route>
                            <Route path="/admin/product/:id">
                                <ProductEditPage />
                            </Route>

                            <Route path="/admin/orderlist">
                                <OrderListPage />
                            </Route>
                        </>
                    )}
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
