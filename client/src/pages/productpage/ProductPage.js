import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button, Image, ListGroup, Form } from "react-bootstrap";
import Message from "../../components/Message/Message";
import RatingStar from "../../components/ratingStar/RatingStar";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail, productReview } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { PRODUCT_REVIEW_RESET } from "../../constants/productListConstants";

const ProductPage = () => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const params = useParams();
    const dispatch = useDispatch();

    const userInfo = localStorage.getItem("userInfo");

    const productDetail = useSelector((state) => state.productDetail);
    const { success } = useSelector((state) => state.productReview);

    const { product } = productDetail;

    console.log(product.reviews);

    useEffect(() => {
        if (success) {
            alert("Your comment is publicated");
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_REVIEW_RESET });
        }

        dispatch(listProductDetail(params.id));
    }, [params.id, dispatch, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productReview(params.id, { rating, comment }));
    };

    return (
        <React.Fragment>
            {/* <Row>
                <Col>
                    <nav aria-label="breadcrumb">
                        <ol
                            style={{ boxShadow: "none" }}
                            className="breadcrumb"
                        >
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/">Library</Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Data
                            </li>
                        </ol>
                    </nav>
                </Col>
            </Row> */}

            <Row className="mb-2">
                <Col>
                    <h3 className="fw-bold fs-1">{product.name}</h3>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col lg={2} md={2} xs={6}>
                    Articul: {product.articul}
                </Col>
                <Col lg={4} md={4} xs={6}>
                    <RatingStar
                        color="text-warning"
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        star={[1, 0.5]}
                    />
                    <RatingStar
                        color="text-warning"
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        star={[2, 1.5]}
                    />
                    <RatingStar
                        color="text-warning"
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        star={[3, 2.5]}
                    />
                    <RatingStar
                        color="text-warning"
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        star={[4, 3.5]}
                    />
                    <RatingStar
                        color="text-warning"
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        star={[5, 4.5]}
                    />{" "}
                    {product.numReviews} reviews
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup
                        variant="flush"
                        style={{ background: "none", boxShadow: "none" }}
                    >
                        <ListGroup.Item>
                            <h1>
                                <strong>Price: </strong>${product.price}
                            </h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <strong>Status: </strong>
                                <span
                                    className={`${
                                        product.countInStock > 0
                                            ? "text-success"
                                            : "text-danger"
                                    } fw-bold`}
                                >
                                    {product.countInStock > 0
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </span>
                            </h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>
                                <strong>Description:</strong>{" "}
                                {product.description}
                            </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <Form.Label className="fs-3">
                                        {product.countInStock < 1 ? (
                                            <h4> This product out of Stock </h4>
                                        ) : (
                                            <h4>Quantity: {qty}</h4>
                                        )}
                                    </Form.Label>
                                    <Form.Range
                                        min={1}
                                        max={product.countInStock}
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        disabled={
                                            product.countInStock < 1
                                                ? true
                                                : false
                                        }
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>
                                Overall: {(qty * product.price).toFixed(2)}$
                            </h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                disabled={product.countInStock < 1 && true}
                                className="w-75"
                                onClick={(e) =>
                                    dispatch(addToCart(product._id, qty))
                                }
                            >
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>

                    <ListGroup variant="flush">
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <span>
                                        <RatingStar
                                            color="text-warning"
                                            value={review.rating}
                                            star={[1, 0.5]}
                                        />
                                        <RatingStar
                                            color="text-warning"
                                            value={review.rating}
                                            star={[2, 1.5]}
                                        />
                                        <RatingStar
                                            color="text-warning"
                                            value={review.rating}
                                            star={[3, 2.5]}
                                        />
                                        <RatingStar
                                            color="text-warning"
                                            value={review.rating}
                                            star={[4, 3.5]}
                                        />
                                        <RatingStar
                                            color="text-warning"
                                            value={review.rating}
                                            star={[5, 4.5]}
                                        />{" "}
                                    </span>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <h1>There is no review</h1>
                        )}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Rate product
                                            </option>
                                            <option value="1">
                                                1 - Poor &#9734;
                                            </option>
                                            <option value="2">
                                                2 - Fair &#9734;&#9734;
                                            </option>
                                            <option value="3">
                                                3 - Good &#9734;&#9734;&#9734;
                                            </option>
                                            <option value="4">
                                                4 - Very Good
                                                &#9734;&#9734;&#9734;&#9734;
                                            </option>
                                            <option value="5">
                                                5 - Excellent
                                                &#9734;&#9734;&#9734;&#9734;&#9734;
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            row="3"
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button type="submit" variant="primary">
                                        Save
                                    </Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to="/login">sign in</Link> to
                                    write a review{" "}
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProductPage;
