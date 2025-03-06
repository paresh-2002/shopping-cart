import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart({ product, handleDelete, addToCart, addedCarts, DeleteToCart }) {
  const isAddedToCart = addedCarts.some((item) => item.id === parseInt(product.id));
  return (
    <div className="card">
      <span className="delete-cart" onClick={() => handleDelete(product.id)}>
        X
      </span>
      <div className="product-image-container">
        <img
          src={product.productImg}
          alt={product.productName}
          className="product-image"
        />
      </div>
      <div>
        <h1 className="product-name">{product.productName}</h1>
        <p className="price">${product.productPrice}</p>
        <p className="product-description">{product.description}</p>
      </div>
      <div className="add-to-cart">
        {/* Conditionally render button based on whether the product is already in the cart */}
        {isAddedToCart ? (
          <button onClick={() => DeleteToCart(product.id)}>Remove from Cart</button>
        ) : (
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        )}
        <Link to={`add-new/${product.id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
