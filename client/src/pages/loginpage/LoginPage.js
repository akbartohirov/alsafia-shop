import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLoginAction } from "../../actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const [form, setForm] = React.useState({
        email: "",
        password: "",
    });
    const { userInfo } = useSelector((state) => state.userLogin);

    const dispatch = useDispatch();

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLoginAction(form.email, form.password));
    };

    const inputTextHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    React.useEffect(() => {
        if (userInfo) {
            setTimeout(() => {
                history.push("/");
            }, 1000);
        }
    }, [history, userInfo]);

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
                    <h1> Sign in </h1>
                    <Form onSubmit={(e) => submitHandler(e)}>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => inputTextHandler(e)}
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={form.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPassword">
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
                            If you don't have an account,{" "}
                            <Link
                                to="/register"
                                className="text-decoration-underline hover-effect-blue"
                            >
                                {" "}
                                Register{" "}
                            </Link>{" "}
                        </p>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default LoginPage;
