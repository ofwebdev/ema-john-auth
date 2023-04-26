import React, { useContext, useState } from "react";
import "./Forgot.scss";
import { AuthContext } from "../provider/AuthProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const { forgotPassword } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    forgotPassword(email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="forgot-password">
      <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
      {emailSent ? (
        <p>An email has been sent to your email address.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
              required
            />
          </div>

          <button>Send Email</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
