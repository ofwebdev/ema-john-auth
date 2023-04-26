import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import ForgotPassword from "./ForgotPassword";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { signIn, signInWithGmail } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError("Please fill all the fields.");
      return;
    }

    // Call API to log in user
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        setError("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setError(
            "Invalid email address. Please try again or register for an account."
          );
        } else if (errorCode === "auth/wrong-password") {
          setError("Incorrect password. Please try again");
        } else {
          setError("An error occurred. Please try again later.");
          console.log(error.message);
        }
      });
  };

  const handelGoogleSignIn = () => {
    signInWithGmail()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {success && <p>Login successful!</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button>Login</button>
      </form>
      <br />
      <div style={{ textAlign: "center" }}>
        <button onClick={handelGoogleSignIn} className="btn btn-primary">
          Sign in with Google
        </button>
      </div>

      <div className="login-links">
        <Link
          to={"/forgot"}
          onClick={toggleForgotPassword}
          className="forgot-password-link"
        >
          Forgot password?
        </Link>
        {showForgotPassword && <ForgotPassword />}
        <Link to={"/register"} className="create-account-link">
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default Login;
