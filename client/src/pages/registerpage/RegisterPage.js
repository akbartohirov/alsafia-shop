import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userRegisterAction } from "../../actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    const state = useSelector((state) => state.userUpdateById);

    console.log(state);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userRegisterAction(form.name, form.email, form.password));
    };

    const inputTextHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Row>
                <Col className="col-6 offset-3">
                    <h1> Register </h1>
                    <Form onSubmit={(e) => submitHandler(e)}>
                        <Form.Group className="mb-3" controlId="registerName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => inputTextHandler(e)}
                                type="name"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => inputTextHandler(e)}
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={form.email}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="registerPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={(e) => inputTextHandler(e)}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Row className="my-5">
                        <p className="fs-4">
                            {" "}
                            If you have an account,{" "}
                            <Link
                                to="/login"
                                className="text-decoration-underline hover-effect-blue"
                            >
                                {" "}
                                Login{" "}
                            </Link>{" "}
                        </p>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default RegisterPage;
