import React from "react";
import axios from "axios";
import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
    listProductDetail,
    productUpdate,
} from "../../../actions/productActions";

const ProductEditPage = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState("");
    const [brand, setBrand] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [countInStock, setCountInStock] = React.useState("");
    const [description, setDescription] = React.useState("");

    const dispatch = useDispatch();

    const { product } = useSelector((state) => state.productDetail);
    const { success } = useSelector((state) => state.productUpdate);

    console.log(success);

    const { id } = useParams();

    const submitHandler = (e, product) => {
        e.preventDefault();
        dispatch(
            productUpdate({
                ...product,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };

    React.useEffect(() => {
        if (!product?.name || product._id !== id) {
            dispatch(listProductDetail(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [dispatch, id, product]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        try {
            const { data } = await axios.post("/api/uploads", formData, config);
            setImage(data);
            toast.success("Image uploaded", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
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
                <Col>
                    <LinkContainer to="/admin/productlist">
                        <Button>Go Back</Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1> Edit User Credentials</h1>
                    <Form onSubmit={(e) => submitHandler(e, product)}>
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
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                value={price}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="registerPassword"
                        >
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                onChange={(e) => setImage(e.target.value)}
                                type="text"
                                name="image"
                                placeholder="Image"
                                value={image}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => uploadFileHandler(e)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="registerPassword"
                        >
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                onChange={(e) => setBrand(e.target.value)}
                                type="text"
                                name="brand"
                                placeholder="Brand"
                                value={brand}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="registerPassword"
                        >
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                name="category"
                                placeholder="Category"
                                value={category}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="registerPassword"
                        >
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                                type="text"
                                name="countInStock"
                                placeholder="Count in stock"
                                value={countInStock}
                            />
                        </Form.Group>

                        <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Description"
                        >
                            <Form.Control
                                as="textarea"
                                style={{ height: "150px", resize: "none" }}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                name="description"
                                placeholder="description"
                                value={description}
                            />
                        </FloatingLabel>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-2"
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default ProductEditPage;
