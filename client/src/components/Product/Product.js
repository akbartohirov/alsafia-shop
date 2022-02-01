import React from "react";
import { Card } from "react-bootstrap";
import RatingStar from "../ratingStar/RatingStar";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="p-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title style={{ cursor: "pointer" }}>
            <div>{product.name}</div>
          </Card.Title>
        </Link>
        <Card.Text>
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
        </Card.Text>
        <Card.Text className="text-end">{product.price} $ </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
