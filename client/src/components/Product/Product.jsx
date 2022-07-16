import React from "react";
import "./Product.css";

const Product = (props) => {
  return (
    <div className="product">
      <img src={props.source} alt="product" />
      <h3>{props.title}</h3>
      <div className="product_specs">
        <h5>Vendor: {props.vendor}</h5>
        <h5>Product Type: {props.type.length === 0 ? "-" : props.type}</h5>
      </div>
      <button>Add to Cart </button>
    </div>
  );
};

export default Product;
