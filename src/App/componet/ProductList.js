import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../src/App.css";
import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      let result = await axios.get("http://localhost:5000/get_list");

      if (result) {
        setProducts(result.data);
      }
    } catch (error) {
      console.log("error =>", error);
    }
  };

  const handleSearch = async (event) => {
    try {
      let key = event.target.value;
      if (key) {
        let result = await axios.get(`http://localhost:5000/search/${key}`);
        console.log(result.data);
        if (result) {
          setProducts(result.data);
        }
      } else {
        getProduct()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteProduct = (id) => {
    try {
      const result = axios.delete(`http://localhost:5000/delete_product/${id}`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ textAlign: "center", marginTop: 20 }}
      className="ProductContainer"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          style={{ width: 400 }}
          label="Search"
          variant="outlined"
          placeholder="Search here..."
          // value={searchText}
          onChange={handleSearch}
        />
        {/* <IconButton onClick={handleSearch} color="primary">
          <SearchIcon />
        </IconButton> */}
      </div>
      <h3>Prduct List</h3>
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Compney</li>
        <li>Opration</li>
      </ul>
      {products.map((product, index) => (
        <ul key={product._id}>
          <li>{index + 1}</li>
          <li>{product.name}</li>
          <li>{product.price}</li>
          <li>{product.category}</li>
          <li>{product.compnay}</li>
          <li>
            <button
              onClick={() => {
                DeleteProduct(product._id);
              }}
            >
              delete
            </button>
            <Link to={`/update/${product._id}`}>update</Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default ProductList;
