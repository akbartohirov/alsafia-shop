import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import { listProduct } from "../../actions/productActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate/Paginate";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";

const HomePage = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const { keyword, pageNumber } = params;

    const productList = useSelector((state) => state.productList);

    const { products, loading, error, pages, page } = productList;

    useEffect(() => {
        dispatch(listProduct(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <div className="my-3">
            <ToastContainer />
            {!keyword && <ProductCarousel />}
            <p className="fs-3">Latest products</p>
            <Row className="gy-5 mb-3">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger"> {error} </Message>
                ) : (
                    products.map((item) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                            <Product product={item} />
                        </Col>
                    ))
                )}
            </Row>
            <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ""}
            />
        </div>
    );
};

export default HomePage;
