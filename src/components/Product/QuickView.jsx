// QuickView.jsx

import { useState } from "react";
import "./QuickView.scss";

export default function QuickView(props) {
  return (
    <div className="quick">
      <div className="view-content">
        <button className="close-btn" onClick={props.onClose}>
          X
        </button>
        <div className="product-details">
          <h2>{props.name}</h2>
          <img src={props.img} alt={props.name} />
          <p>{props.description}</p>
          <p>Price: ${props.price}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
