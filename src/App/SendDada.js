import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
function SendData() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const getData = async () => {
    try {
      await axios.get("http://localhost:5000/userData").then((item) => {
        if (item) {
          const arr = [];
          if (arr.length != item.data.length) {
            item.data.map((item) => {
              arr.push(item);
            });
          }
          setData(arr);
          // console.log(data);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [data]);

  const handleSubmit = async () => {
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    let Data = {
      name: name,
      email: email,
    };

    if (name && email) {
      try {
        const response = await axios.post("http://localhost:5000/", Data);

        console.log("Response:", response.data);
        if (response.data.acknowledged) {
          setName("");
          setEmail("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        // justifyContent: "center",
        height: "100vh", // Center vertically on the screen
      }}
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setNameError(false); // Clear the error when user types
        }}
        error={nameError}
        helperText={nameError && "Name is required"}
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false); // Clear the error when user types
        }}
        error={emailError}
        helperText={emailError && "Email is required"}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Button onClick={handleSubmit} variant="contained">
        Save
      </Button>

      {/* <div>
        {data.map((item, index) => (
          <div key={index}>
            <div>
              <h4>
                {item.name} : {item.email}
              </h4>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default SendData;
