import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Toast = (props) => {
    return (
        <Row>
            <Col md={6} className="mb-2">
                <Button className="mb-2">
                    Toggle Toast <strong>with</strong> Animation
                </Button>
                <Toast show={props.show}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>
                        Woohoo, you're reading this text in a Toast!
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
};

export default Toast;
