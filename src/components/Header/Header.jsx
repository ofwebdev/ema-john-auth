import React, { useContext, useState } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Header = () => {
  const [success, setSuccess] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const navigation = useNavigate();

  const logoutHandler = () => {
    logOut()
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigation("/login");
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <nav className="header">
        <img src={logo} alt="" />
        <div>
          <Link to="/">Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/inventory">Inventory</Link>
          {user ? (
            <Link to="/login" onClick={logoutHandler}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/register">Register</Link>
        </div>

        {success && <p>Logout successful!</p>}
      </nav>
    </>
  );
};

export default Header;
