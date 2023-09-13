import React from "react";
import SendData from "./App/SendDada";
import Nav from "./App/componet/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Foter from "./App/componet/Footer";
import SignUp from "./App/componet/SignUp";
import PriveteComponet from "./App/componet/PrivateComponet";
import Login from "./App/componet/Login";
import AddProduct from "./App/componet/AddProduct";
import ProductList from "./App/componet/ProductList";
import UpadatProduct from "./App/componet/UpadatProduct";
import ImageViwer from "./App/ImagViwer/ImageViwer";
import Home from "./App/ImagViwer/Home";
import SimpleimageViwer from "./App/ImagViwer/SimpleimageViwer";
import SimplePdfViwer from "./App/ImagViwer/SimplePdfViwer";

function App() {
  return (
    // <>
    //   <BrowserRouter>
    //     <Nav />
    //     <Routes>
    //       <Route element={<PriveteComponet />}>
    //         <Route path="/" element={<ProductList />}></Route>
    //         <Route path="/add" element={<AddProduct />}></Route>
    //         <Route path="/update/:id" element={<UpadatProduct />}></Route>
    //         <Route path="/Logout" element={<h1>Logout</h1>}></Route>
    //         <Route path="/Profile" element={<h1>Profile</h1>}></Route>
    //       </Route>
    //       <Route path="/SignUp" element={<SignUp />}></Route>
    //       <Route path="/Login" element={<Login />}></Route>
    //     </Routes>

    //     {/* <Foter /> */}
    //   </BrowserRouter>
    // </>
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/image" element={<SimpleimageViwer />}></Route>
          <Route path="/pdf" element={<SimplePdfViwer />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
