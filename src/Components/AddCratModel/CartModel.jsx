import React from "react";
import "./CartModel.css";

function CartModel({ products,DeleteToCart }) {
  const CONVENIENCE_FEES = 99;

  let totalPrice = products
    .map((product) => {
      return Math.round(product.productPrice);
    })
    .reduce((acc, product) => acc + product, 0);
  let totalAmount = totalPrice + CONVENIENCE_FEES;
  console.log(totalAmount);
  return (
    <div className="container">
      <div className="cardModel-container">
        <div>
          {products.length <= 0 ? (
            <h1 className="found-msg">No products in the cart</h1>
          ) : (
            products.map((product) => (
              <div key={product.id} className="cardModel">
                <span
                  className="delete-cart-icon"
                  onClick={() => DeleteToCart(product.id)}
                >
                  X
                </span>
                <div className="model-image-container">
                  <img
                    src={product.productImg}
                    alt={product.productName}
                    className="product-image"
                  />
                </div>
                <div className="cart-details">
                  <h1 className="product-name">{product.productName}</h1>
                  <p className="price">${product.productPrice}</p>
                  <p className="product-description">{product.category}</p>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="details">
          <div className="details-header">
            PRICE DETAILS ItemQty : {products.length}
          </div>
          <div className="details-text">
            <span>Total MRP</span>
            <span>$ {totalPrice}</span>
          </div>
          <div className="details-text">
            <span>Convenience Fee</span>
            <span>$ {CONVENIENCE_FEES}</span>
          </div>
          <hr />
          <div className="details-text">
            <span>Total Amount</span>
            <span>$ {totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModel;
