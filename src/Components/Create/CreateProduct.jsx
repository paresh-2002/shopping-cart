import React, { useState, useEffect } from "react";
import "./CreateProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../spinner/LoadingSpinner";

const categoryList = [
  { name: "fashion" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
  { name: "home" },
  { name: "books" },
];

function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState({
    id: Date.now(),
    productName: "",
    productPrice: "",
    productImg: "",
    category: "home",
    description: "",
  });

  useEffect(() => {
    if (productId) {
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      const productToEdit = existingProducts.find(
        (item) => item.id === parseInt(productId)
      );

      if (productToEdit) {
        setProduct({
          productName: productToEdit.productName,
          productPrice: productToEdit.productPrice,
          productImg: productToEdit.productImg,
          description: productToEdit.description,
          category: productToEdit.category,
        });
      }
    }
  }, [productId]);

  const addProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    const { productName, productPrice, productImg, description } = product;

    if (!productName || !productPrice || !productImg || !description) {
      setError("All fields must be filled correctly.");
      setLoading(false);
      return;
    }

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    if (productId) {
      const updatedProducts = existingProducts.map((item) => {
        if (item.id === parseInt(productId)) {
          return { ...item, ...product };
        }
        return item;
      });
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      const newProduct = { ...product, id: Date.now() };
      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container-main">
      <div className="sticky-header">
        <h2 className="header">{productId ? "Edit Product" : "Add Product"}</h2>
      </div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={addProduct} className="form">
          <div className="form-group">
            <label htmlFor="product_name" className="label">
              Product Name
            </label>
            <input
              type="text"
              required
              name="product_name"
              id="product_name"
              className="input"
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_price" className="label">
              Product Price
            </label>
            <input
              type="number"
              name="product_price"
              required
              id="product_price"
              className="input"
              value={product.productPrice}
              onChange={(e) =>
                setProduct({ ...product, productPrice: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="label">
              Description
            </label>
            <input
              type="text"
              required
              id="description"
              className="input"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_img" className="label">
              Product Image URL
            </label>
            <input
              type="text"
              required
              id="product_img"
              className="input"
              value={product.productImg}
              onChange={(e) =>
                setProduct({ ...product, productImg: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_category" className="label">
              Product Category
            </label>
            <select
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="select"
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <button className="button" type="submit">
            {loading ? <LoadingSpinner /> : productId ? "Update" : "Add"}
          </button>
        </form>
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default CreateProduct;
