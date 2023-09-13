import React, { useState, useEffect } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const signupUrl = "http://localhost:5000/signup";
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const SignUp = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const result = await axios.post(signupUrl, data, {
        headers: { "Content-Type": "application/json" }, // Corrected syntax
      });
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.data));
      setPassword("");
      setEmail("");
      setName("");
      navigate("/");
      //   if (result) {
      //     navigate("update");
      //   }
    } catch (error) {}
    // http://localhost:5000/signup
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 250,
          padding: 20,
          //   background: "red",
          boxShadow: "0px 4px 6px rgba(2, 0, 0, 0.3)",
          marginTop: 20,
        }}
      >
        <h1 style={{ alignSelf: "flex-start" }}>SignUp</h1>
        <TextField
          id="outlined-password-input"
          label="Name"
          style={{ marginBottom: 20, width: 250 }}
          type={"text"}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          style={{ width: 250 }}
          id="outlined-password-input"
          label="Email"
          type={"email"}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          style={{ marginTop: 20, width: 250 }}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  tabIndex="-1"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={() => {
            SignUp();
          }}
          variant="contained"
          style={{ marginTop: 20 }}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
