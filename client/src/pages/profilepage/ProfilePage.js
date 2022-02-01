import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { Row, Col, Form, Button } from "react-bootstrap";
import { userDetailsAction, userUpdateAction } from "../../actions/userActions";
import { ToastContainer } from "react-toastify";

const ProfilePage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);

    const userUpdate = useSelector((state) => state.userUpdate);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userUpdateAction({ name, email, password }));
    };

    React.useEffect(() => {
        dispatch(userDetailsAction("profile"));
    }, [dispatch]);

    React.useEffect(() => {
        if (!userDetails.loading) {
            setName(userDetails.user.name);
            setEmail(userDetails.user.email);
        }
    }, [userDetails]);

    return (
        <Row>
            <Col className="col-4">
                <h2>User profile</h2>
                {userUpdate.success && <ToastContainer />}
                {userDetails.loading ? (
                    <Loader />
                ) : (
                    <Form onSubmit={(e) => submitHandler(e)}>
                        <Form.Group className="mb-3" controlId="profileName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                type="name"
                                name="name"
                                placeholder="Name"
                                value={name ? name : ""}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="profileEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email ? email : ""}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="profilePassword"
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
                )}
            </Col>
            <Col className="col-8">
                <h2>My orders</h2>
            </Col>
        </Row>
    );
};
export default ProfilePage;
