import { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [username, setUsername] = useState("nitsu98");
  const [password, setPassword] = useState("agus1234");
  const [message, setMessage] = useState(null);
  const [info, setInfo] = useState(null);
  const [products, setProducts] = useState(null);
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [url, setUrl] = useState(null)
  const [stock, setStock] = useState(null)
  const [price, setPrice] = useState(null)
  axios.defaults.withCredentials = true;

  async function handleLogin() {
    const response = await axios.post("http://localhost:8080/login", {
      username,
      password,
    });
    setMessage(response.data.message);
    setInfo(response?.data?.info);
  }

  async function getProducts() {
    const response = await axios.get("http://localhost:8080/api/products");
    setProducts(response.data);
  }

  async function addProduct() {
    if(title && description && url && price && stock) {
      await axios.post("http://localhost:8080/api/products", {
        title, description, url, stock, price
      });
      getProducts()
    } else {
      alert('Complete all inputs')
    }
  }

  async function handleDelete(id) {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    getProducts();
  }

  return (
    <div className="container" style={{ padding: "2rem" }}>
      {!info ? (
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
          <div className="message">{message ? <h3>{message}</h3> : null}</div>
        </div>
      ) : (
        <>
          <div
            className="userInfo"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <p>Email: {info.email}</p>
            <p>Firstname: {info.firstName}</p>
            <p>LastName: {info.lastName}</p>
          </div>
          <button onClick={getProducts}>Get Products</button>
          {products ? (
            <div
              style={{ display: "flex", justifyContent: "space-evenly" }}
              className="products"
            >
              {products.map((product, index) => {
                return (
                  <div key={index}>
                    <Card>
                      <Card.Img
                        variant="top"
                        height="200px"
                        style={{ width: "250px" }}
                        src={product.url}
                      />
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>Price: {product.price}</Card.Text>
                        <Card.Text>Stock: {product.stock}</Card.Text>
                        <Card.Text>Code: {product.code}</Card.Text>
                      </Card.Body>
                      <button onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="addProduct">
            <h2>Add Product</h2>
            <p>title</p>
            <input name="title" onChange={(evt)=>setTitle(evt.target.value)} type="text" />
            <p>description</p>
            <input name="description" onChange={(evt)=>setDescription(evt.target.value)} type="text" />
            <p>url</p>
            <input name="url" onChange={(evt)=>setUrl(evt.target.value)} type="text" />
            <p>price</p>
            <input name="price" onChange={(evt)=>setPrice(evt.target.value)} type="number" />
            <p>stock</p>
            <input name="stock" onChange={(evt)=>setStock(evt.target.value)} type="number" />
            <br />
            <button onClick={addProduct}>Submit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
