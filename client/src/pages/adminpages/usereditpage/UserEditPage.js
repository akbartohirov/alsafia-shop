import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
    userUpdateByIdAction,
    userDetailsAction,
} from "../../../actions/userActions";

const UserEditPage = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userDetails);

    console.log(user?.name);

    const { id } = useParams();

    console.log(id);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userUpdateByIdAction(id, { name, email, password }));
    };

    React.useEffect(() => {
        if (!user?.name) {
            dispatch(userDetailsAction(id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, id, user]);

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
                    <h1> Edit User Credentials</h1>
                    <Form onSubmit={(e) => submitHandler(e)}>
                        <Form.Group className="mb-3" controlId="registerName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                type="name"
                                name="name"
                                placeholder="Name"
                                value={name}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="registerEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="registerPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default UserEditPage;
