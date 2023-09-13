import React, { useState, useEffect } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const LoginUrl = "http://localhost:5000/login";

  const handleLogin = async () => {
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post(LoginUrl, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.name) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setPassword("");
        setEmail("");
        navigate("/");
      } else {
        alert("please enter correct details");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
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
          boxShadow: "0px 4px 6px rgba(2, 0, 0, 0.3)",
          marginTop: 40,
        }}
      >
        <h1 style={{ alignSelf: "flex-start" }}>Login</h1>
        <TextField
          style={{ width: 250 }}
        
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
          onClick={handleLogin}
          variant="contained"
          style={{ marginTop: 20 }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
