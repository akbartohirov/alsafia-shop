import React from "react";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
    Col,
    Row,
    Image,
    Form,
    Card,
    ListGroup,
    Button,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../../actions/cartActions";

const CartPage = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <>
            <ToastContainer />
            <Row>
                <Col md={8}>
                    {cartItems.length > 0 ? (
                        cartItems.map((el, i) => (
                            <Card key={i} className="my-3">
                                <Row className="align-items-center gx-0">
                                    <Col
                                        className={
                                            "d-flex justify-content-center"
                                        }
                                    >
                                        <Image fluid src={el.image} />
                                    </Col>
                                    <Col
                                        className={
                                            "d-flex justify-content-center"
                                        }
                                    >
                                        {el.name}
                                    </Col>
                                    <Col
                                        className={
                                            "d-flex justify-content-center"
                                        }
                                    >
                                        $ {(el.qty * el.price * 1).toFixed(2)}
                                    </Col>
                                    <Col
                                        className={
                                            "d-flex justify-content-center"
                                        }
                                    >
                                        <Form.Select
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        el.product,
                                                        1 * e.target.value
                                                    )
                                                )
                                            }
                                            className="w-75"
                                            aria-label="Default select example"
                                            value={el.qty}
                                        >
                                            {[
                                                ...Array(
                                                    cartItems[0].countInStock
                                                ).keys(),
                                            ].map((el) => (
                                                <option key={el} value={el + 1}>
                                                    {el + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col
                                        className={
                                            "d-flex justify-content-center"
                                        }
                                    >
                                        <span
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart(el.product)
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash hover-effect-red"></i>
                                        </span>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    ) : (
                        <h1>Your cart is empty now!</h1>
                    )}
                </Col>
                <Col className="offset-1" md={3}>
                    <ListGroup className="p-2">
                        <ListGroup.Item>
                            <Row>
                                <Col>Total products</Col>
                                <Col>
                                    {cartItems.reduce(
                                        (acc, el) => acc + el.qty,
                                        0
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Overall Price</Col>
                                <Col>
                                    ${" "}
                                    {cartItems
                                        .reduce(
                                            (acc, el) =>
                                                acc + el.qty * el.price,
                                            0
                                        )
                                        .toFixed(2)}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className={"w-100"}>Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default CartPage;
