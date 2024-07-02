import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { username, password, setUsername, setPassword } =
    useContext(UserContext);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setError("passwords don't match.");
      return;
    }

    try {
      const res = await register({ username, password });

      if (res) {
        alert("Registered successfully!");
        setError("");
        navigate("/");
      }
    } catch (err) {
      if (err.name == "AbortError") {
        console.log(err.message);
      } else {
        console.error("An Error occured", err);
      }
    }
  };

  return (
    <section className="form-section">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="confirmpass"
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
          autoComplete="off"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
        <Link className="form-link" to="/login">
          Login
        </Link>
      </form>
    </section>
  );
};

export default Register;
