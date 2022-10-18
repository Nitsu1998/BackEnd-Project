import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("nitsu98");
  const [password, setPassword] = useState("agus1234");
  const [message, setMessage] = useState(null);
  const [info, setInfo] = useState(null);

  async function handleLogin() {
    const response = await axios.post("http://localhost:8080/login", {
      username,
      password,
    });
    setMessage(response.data.message);
    setInfo(response?.data?.info);
  }

  async function getProducts() {
    const respose = await axios.get("http://localhost:8080/api/products", {
      withCredentials: true
    });
    console.log(respose);
  }

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <div className="login">
        <input
          type="text"
          onChange={(evt) => setUsername(evt.target.value)}
          defaultValue={username}
        />
        <input
          type="password"
          onChange={(evt) => setPassword(evt.target.value)}
          defaultValue={password}
        />
        <button
          disabled={username && password ? false : true}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="message">{message ? <p>{message}</p> : null}</div>
      <div className="userInfo">
        {info ? (
          <div>
            <h2>User information</h2>
            <p>Email: {info.email}</p>
            <p>Firstname: {info.firstName}</p>
            <p>LastName: {info.lastName}</p>
            <button onClick={getProducts}>Get Products</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
