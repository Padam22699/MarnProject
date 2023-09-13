import React from "react";
import { Link, useNavigate } from "react-router-dom";

const navStyle = {
  background: "#22668D",
  display: "flex",
  justifyContent: "flex-end", // Align the list to the flex-end
  padding: "5px", // Add padding for spacing
};
const navStyle2 = {
  background: "#22668D",
  display: "flex",

  // justifyContent: "flex-end", // Align the list to the flex-end
  padding: "5px", // Add padding for spacing
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
  display: "flex", // Add display: flex
  alignItems: "center", // Vertically center the list items
};

const listItemStyle = {
  margin: "0 10px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const Nav = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/SignUp");
  };
  const auth = localStorage.getItem("user");

  return (
    <div style={navStyle2} className="NavContenr">
    
      {auth ? (
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <Link to={"/"} style={linkStyle}>
              Products
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link to={"/add"} style={linkStyle}>
              Add Products
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link to={"/update"} style={linkStyle}>
              Update Products
            </Link>
          </li>

          <li style={listItemStyle}>
            <Link to={"/Profile"} style={linkStyle}>
              Profile
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link
              to={"/SignUp"}
              onClick={() => {
                Logout();
              }}
              style={linkStyle}
            >
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <div tyle={navStyle}>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <Link to={"/SignUp"} style={linkStyle}>
                SignUp
              </Link>
            </li>
            <li style={listItemStyle}>
              <Link to={"/Login"} style={linkStyle}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
