import React, { useEffect, useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import axios from "axios";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [userId, setUserId] = useState("");
  const [productNameError, seproductNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setcategoryError] = useState(false);
  const [companyError, setcompanyError] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUserId(JSON.parse(data)._id);
    }
  }, []);
  const handleAdd = async () => {
    if (
      productName.length > 0 &&
      price.length > 0 &&
      category.length > 0 &&
      company.length > 0 &&
      userId.length > 0
    ) {
      try {
        const url = "http://localhost:5000/add_product";
        const data = {
          name: productName,
          price: price,
          category: category,
          userId: userId,
          compnay: company,
        };

        const respons = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(respons);
        setCategory("");
        setPrice("");
        setProductName("");
        setCompany("");
      } catch (error) {
        console.log("error =>", error);
      }
    } else {
      if (productName.length <= 0) seproductNameError(true);
      if (price.length <= 0) setPriceError(true);
      if (category.length <= 0) setcategoryError(true);
      if (company.length <= 0) setcompanyError(true);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          width: 300,
          paddingBottom: 20,
          marginTop: 20,
          boxShadow: "0px 4px 6px rgba(2, 0, 0, 0.3)",
        }}
      >
        <h1>Add Product</h1>
        <TextField
          style={styles.textInput}
          label="Product name"
          type="text"
          variant="outlined"
          value={productName}
          placeholder="Enter product name"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          error={productNameError}
          helperText={productNameError && "ProductName is required"}
          onFocus={() => {
            seproductNameError(false);
          }}
        />
        <TextField
          style={styles.textInput}
          label="Price"
          placeholder="Enter product Price"
          type="number"
          variant="outlined"
          onFocus={() => {
            setPriceError(false);
          }}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          error={priceError}
          helperText={priceError && "Price is required"}
        />
        <TextField
          style={styles.textInput}
          label="Category"
          type="text"
          placeholder="Enter product Category"
          variant="outlined"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          error={categoryError}
          helperText={categoryError && "category is required"}
          onFocus={() => {
            setcategoryError(false);
          }}
        />
        <TextField
          style={styles.textInput}
          placeholder="Enter product Company"
          label="Company"
          type="text"
          variant="outlined"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          error={companyError}
          helperText={companyError && "Price is required"}
          onFocus={() => {
            setcompanyError(false);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleAdd();
          }}
          style={{}}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default AddProduct;

const styles = {
  textInput: {
    paddingBottom: 20,
  },
};
