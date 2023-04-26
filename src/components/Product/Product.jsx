import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import QuickView from "./QuickView";

const Product = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { img, name, seller, ratings, price, description } = props.product;
  const handleAddToCart = props.handleAddToCart;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-info">
        <h6 className="product-name">{name}</h6>
        <p>Price: ${price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} Stars</p>
        <div className="g-btn">
          <button onClick={() => handleAddToCart(props.product)}>
            Add to Cart
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button onClick={() => setShowModal(true)}>Open Quick View</button>
          {showModal && (
            <QuickView
              name={name}
              img={img}
              price={price}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
