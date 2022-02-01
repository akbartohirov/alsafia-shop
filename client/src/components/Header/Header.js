import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../searchbox/SearchBox";

const Header = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const { userInfo } = useSelector((state) => state.userLogin);

    return (
        <Navbar
            className="sticky-top"
            bg="light"
            expand="lg"
            style={{ minHeight: "10vh" }}
        >
            (
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand className="fs-1">Alsafia</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <SearchBox />
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        {userInfo ? (
                            <NavDropdown
                                id="username"
                                title={`${userInfo.user.name}`}
                            >
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item
                                    onClick={() => {
                                        dispatch(userLogout());
                                        history.push("/");
                                        toast.warning(
                                            "You have been logged out!",
                                            {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            }
                                        );
                                    }}
                                >
                                    Log out
                                </NavDropdown.Item>
                                {userInfo && userInfo.user.isAdmin && (
                                    <>
                                        <NavDropdown.Divider />
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>
                                                Users
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>
                                                Products
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>
                                                Orders
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                )}
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    {" "}
                                    <i className="fas fa-user"></i> Sign in
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        <LinkContainer to="/cart">
                            <Nav.Link>
                                {" "}
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
