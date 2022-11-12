import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { contextUser } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRef } from "react";

export default function Register() {
  const { register, message, handleMessage, user } = useContext(contextUser);
  const [username, setUsername] = useState();
  const [firstName, setFirstname] = useState();
  const [lastName, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigation = useRef(useNavigate());

  const handleRegister = async (evt) => {
    evt.preventDefault();
    if (!username || !password || !firstName || !lastName || !phone || !email) {
      return toast.error("Complete all fields", { autoClose: 2000 });
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match", { autoClose: 2000 });
    }
    const response = await register({
      username,
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    if (response) {
      navigation.current("/login");
    }
  };

  useEffect(() => {
    if (user) {
      navigation.current("/main");
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
      <h2 style={{ color: "white", margin: "0" }}>REGISTER</h2>
      <span style={{ color: "red", margin: "0.5rem" }}>{message}</span>
      <Form
        onSubmit={handleRegister}
        style={{
          width: "35rem",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
        }}
        className="container"
      >
        <div className="d-flex justify-content-between">
          <Form.Group className="mb-3 ">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(evt) => setUsername(evt.target.value)}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              onChange={(evt) => setFirstname(evt.target.value)}
              type="text"
              placeholder="Enter firstname"
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-between">
          <Form.Group className="mb-3">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              onChange={(evt) => setLastname(evt.target.value)}
              type="text"
              placeholder="Enter lastname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={(evt) => setPhone(evt.target.value)}
              type="phone"
              placeholder="Enter phone"
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(evt) => setEmail(evt.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(evt) => setPassword(evt.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(evt) => setConfirmPassword(evt.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <div>
          <Link onClick={()=>handleMessage(null)} to="/login">Already have an account? Login</Link>
        </div>

        <Button className="mt-3" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
