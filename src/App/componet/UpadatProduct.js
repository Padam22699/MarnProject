import React, { useEffect, useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpadatProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [userId, setUserId] = useState("");
  const [productNameError, seproductNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setcategoryError] = useState(false);
  const [companyError, setcompanyError] = useState(false);
  const [id, setId] = useState();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    console.log(params.id);
    const data = localStorage.getItem("user");
    if (data) {
      setUserId(JSON.parse(data)._id);
    }
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/get_update_product/${params.id}`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (result) {
        setProductName(result.data.name);
        setPrice(result.data.price);
        setCategory(result.data.category);
        setCompany(result.data.compnay);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleAdd = async () => {
  //     if (
  //       productName.length > 0 &&
  //       price.length > 0 &&
  //       category.length > 0 &&
  //       company.length > 0 &&
  //       userId.length > 0
  //     ) {
  //       try {

  //         const data = {
  //           name: productName,
  //           price: price,
  //           category: category,
  //           userId: userId,
  //           compnay: company,
  //         };

  //         setCategory("");
  //         setPrice("");
  //         setProductName("");
  //         setCompany("");
  //       } catch (error) {
  //         console.log("error =>", error);
  //       }
  //     }
  //   };
  const updateProduct = async () => {
    const data = {
      name: productName,
      price: price,
      category: category,
      compnay: company,
    };
    if (
      productName.length > 0 &&
      price.length > 0 &&
      category.length > 0 &&
      company.length > 0 &&
      userId.length > 0
    ) {
      try {
        const result = await axios.put(
          `http://localhost:5000/update_product/${params.id}`,
          data
        );
        console.log(result);
        setCategory("");
        setPrice("");
        setProductName("");
        setCompany("");
        navigate("/");
      } catch (error) {
        console.log("error", error);
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
        <h1>Update Product</h1>
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
            updateProduct();
          }}
          style={{}}
        >
          Save Product
        </Button>
      </div>
    </div>
  );
}

const styles = {
  textInput: {
    paddingBottom: 20,
  },
};

export default UpadatProduct;
