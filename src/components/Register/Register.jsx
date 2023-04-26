import React, { useContext, useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { createUser } = useContext(AuthContext);

  const handelRegister = (e) => {
    e.preventDefault();

    const action = e.target;

    const email = action.email.value;
    const password = action.password.value;
    const confirmPassword = action.confirm.value;

    if (!email || !password || !confirmPassword) {
      setError("Please fill all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Call API to register user
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess(true);
        action.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handelRegister}>
        {error && <p>{error}</p>}
        {success && <p>Registration successful!</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button>Register</button>
      </form>

      <div className="login-links">
        <Link to={"/login"} className="create-account-link">
          Already have an account.
        </Link>
      </div>
    </div>
  );
}

export default Register;
