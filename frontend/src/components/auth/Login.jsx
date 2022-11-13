import { useContext, useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { contextUser } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Login() {
  const { login, message, handleMessage, user } = useContext(contextUser);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigation = useRef(useNavigate());

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!username || !password) {
      return toast.error("Complete all fields", { autoClose: 2000 });
    }
    login({ username, password });
  };

  useEffect(() => {
    if (user) {
      navigation.current("/products");
    }
  }, [user]);

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white", margin: "0" }}>LOGIN</h2>
      <span style={{ color: "red", margin: "0.5rem" }}>{message}</span>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "20rem",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
        }}
        className="container"
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(evt) => setUsername(evt.target.value)}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(evt) => setPassword(evt.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Link onClick={()=>handleMessage(null)} to="/register">Don't have an account? Register</Link>

        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
