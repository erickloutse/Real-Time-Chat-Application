import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importer Link depuis react-router-dom

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      history.push("/chatrooms");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>
          You do not have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
