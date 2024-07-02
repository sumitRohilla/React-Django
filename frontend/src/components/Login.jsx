import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { username, password, setUsername, setPassword } =
    useContext(UserContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ username, password });

      if (res) {
        alert("Logged in successfully!");
        navigate("/");
      } else {
        alert("invalid credentials!");
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
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <Link className="form-link" to="/register">
          Register
        </Link>
      </form>
    </section>
  );
};

export default Login;
