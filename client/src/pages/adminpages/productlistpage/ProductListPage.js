import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";
import { useHistory } from "react-router-dom";
import {
    listProduct,
    productDelete,
    productCreate,
} from "../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../constants/productListConstants";

const ProductListPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const productList = useSelector((state) => state.productList);
    const { success } = useSelector((state) => state.productDelete);
    const { success: successCreated, product } = useSelector(
        (state) => state.productCreate
    );
    console.log(product);

    React.useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        dispatch(listProduct());

        if (successCreated) {
            history.push(`/admin/product/${product._id}`);
        }
    }, [dispatch, success, history, successCreated, product]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(productDelete(id));
        }
    };

    const createProductHandler = (e) => {
        dispatch(productCreate());
    };

    return (
        <>
            <ToastContainer />
            <Row className="justify-content-space-between">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={createProductHandler}>
                        Create Product
                    </Button>
                </Col>
            </Row>
            {productList.error && (
                <Message variant="danger">{productList.error}</Message>
            )}
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>category</th>
                        <th>Brand</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.products.map((product) => (
                        <tr key={product._id}>
                            <th>{product._id}</th>
                            <th>{product.name}</th>
                            <th>{product.price}</th>
                            <th>{product.category}</th>
                            <th>{product.brand}</th>
                            <th className="d-flex justify-content-center">
                                <LinkContainer
                                    to={`/admin/product/${product._id}`}
                                >
                                    <Button variant="light">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant="danger"
                                    onClick={(e) => deleteHandler(product._id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {productList.loading && <Loader />}
        </>
    );
};

export default ProductListPage;
