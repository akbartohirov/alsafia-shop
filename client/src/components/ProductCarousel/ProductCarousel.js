import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { listTopProduct } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

const ProductCarousel = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productTop);

    const { topProducts, error, loading } = products;

    useEffect(() => {
        dispatch(listTopProduct());
    }, [dispatch]);

    return (
        <>
            {error && <Message variant="danger">{error} </Message>}
            {loading ? (
                <Loader />
            ) : (
                <Carousel pause="hover" className="bg-dark">
                    {topProducts &&
                        topProducts.map((product) => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <Image
                                        src={product.image}
                                        alt={product.image}
                                    ></Image>
                                    <Carousel.Caption>
                                        <h2>{product.name} </h2>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                </Carousel>
            )}
        </>
    );
};

export default ProductCarousel;
