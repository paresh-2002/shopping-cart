import React, { useReducer, useEffect, useState } from "react";
import Cart from "../Components/Cart/Cart";
import "../Components/Cart/Cart.css";
import "./Carts.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Products from "../Data/Products.json";
import LoadingSpinner from "../Components/spinner/LoadingSpinner";

const initialState = {
  products: Products || [],
  addToCarts: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_CART":
      return {
        ...state,
        addToCarts: action.payload,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "DELETE_TO_CART":
      return {
        ...state,
        addToCarts: state.addToCarts.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

function Carts() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [loading, setLoading] = useState(false);
  console.log(state.products);
  const [searchVal, setSearchVal] = useState("");

  const filteredProducts = state.products.filter((product) =>
    product?.productName?.toLowerCase().includes(searchVal.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    fetch("/data/Products.json")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_PRODUCTS", payload: data });
        
      })
      .catch((error) => console.error("Error fetching products:", error));

    const cart = localStorage.getItem("addToCart");
    if (cart) {
      dispatch({ type: "ADD_CART", payload: JSON.parse(cart) });
    }
    setTimeout(()=>{
      setLoading(false)
    },2000)
  }, []);

  const addToCart = (product) => {
    const isProductInCart = state.addToCarts.some(
      (item) => item.id === product.id
    );
    if (!isProductInCart) {
      const updatedCart = [...state.addToCarts, product];
      localStorage.setItem("addToCart", JSON.stringify(updatedCart));
      dispatch({ type: "ADD_CART", payload: updatedCart });
    } else {
      alert("Product is already in the cart.");
    }
  };

  const handleDelete = (productId) => {
    const updatedCart = state.products.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("products", JSON.stringify(updatedCart));
    dispatch({ type: "DELETE_PRODUCT", payload: productId });
  };
  const DeleteToCart = (productId) => {
    const updatedCart = state.addToCarts.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("addToCart", JSON.stringify(updatedCart));
    dispatch({ type: "DELETE_TO_CART", payload: productId });
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="AppTitle">Shopping Cart</h1>
        <div className="cart-header-right">
          <input
            type="search"
            placeholder="Search..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <div className="cart-icon-container">
            <FaShoppingCart className="fa-shopping-cart" />
            <span className="cart-item-count">{state.addToCarts.length}</span>
          </div>
          <Link to="add-new" className="addBtn">
            Add New
          </Link>
        </div>
      </div>
      <div className="carts">
        {loading ? (
          <div className="fetch_spinner">
            <LoadingSpinner/>
          </div>
        ) : filteredProducts.length <= 0 || state.products.length <= 0 ? (
          <h1 className="header-title">No products in the cart</h1>
        ) : (
          filteredProducts.map((product) => (
            <Cart
              key={product.id}
              product={product}
              handleDelete={handleDelete}
              addToCart={addToCart}
              addedCarts={state.addToCarts}
              DeleteToCart={DeleteToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Carts;
