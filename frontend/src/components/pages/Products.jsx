import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contextUser } from "../../context/userContext";
import NavBar from "../Navbar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;
const host = process.env.REACT_APP_HOST_API;

export default function Products() {
  const { user, cartId, handleCartId, sessionExpired } =
    useContext(contextUser);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [stock, setStock] = useState(null);
  const [price, setPrice] = useState(null);
  const navigation = useRef(useNavigate());

  async function getProducts() {
    try {
      const response = await axios.get(host + "/api/products");
      setProducts(response.data);
    } catch (err) {
      sessionExpired();
    }
  }

  async function createProduct(evt) {
    try {
      evt.preventDefault();
      
      if (!title || !description || !url || !price || !stock) {
        return toast.error("Complete all fields", { autoClose: 2000 });
      }
      await axios.post(host + "/api/products", {
        title,
        description,
        url,
        stock,
        price,
      });
      getProducts();
      setPage(0);
      swal({
        title: "Product added successfully!",
        text: `${title}`,
        icon: "success",
        buttons: false,
        timer: 2000
      });
      setTitle(null)
      setDescription(null)
      setUrl(null)
      setStock(null)
      setPrice(null)
    } catch (err) {
      sessionExpired();
    }
  }

  async function deleteProduct(id) {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          async function foo() {
            await axios.delete(host + `/api/products/${id}`);
            getProducts();
          }
          foo();
          swal("Poof! This product has been deleted!", {
            icon: "success",
            buttons: false,
            timer: 2000,
          });
        } else {
          swal("This product is safe!", {
            icon: "success",
            buttons: false,
            timer: 2000,
          });
        }
      });
    } catch (err) {
      sessionExpired();
    }
  }

  async function addToCart(id) {
    try {
      if (!cartId) {
        const response = await axios.post(host + "/api/cart", {userId: user._id});
        handleCartId(response.data.cartId);
        await axios.post(host + `/api/cart/${response.data.cartId}/products`, {
          id,
        });
      } else {
        await axios.post(host + `/api/cart/${cartId}/products`, { id });
      }
      navigation.current("/cart");
    } catch (error) {
      sessionExpired();
    }
  }

  useEffect(() => {
    if (!user) {
      navigation.current("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getProducts();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundColor: "GrayText",
          minHeight: "calc(100vh - 4rem)",
          width: "100%",
        }}
      >
        <h2 style={{ color: "white" }} className="text-center">
          PRODUCTS
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="m-2" onClick={() => setPage(0)}>
            Show products
          </button>

          <button className="m-2" onClick={() => setPage(1)}>
            Create product
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            padding: "1rem",
          }}
        >
          {products && page === 0
            ? products.map((product, index) => {
                return (
                  <div style={{ margin: "1rem" }} key={index}>
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
                      <button onClick={() => addToCart(product._id)}>
                        Add to cart
                      </button>
                      <button onClick={() => deleteProduct(product._id)}>
                        Delete
                      </button>
                    </Card>
                  </div>
                );
              })
            : null}
          {page === 1 ? (
            <Form
              onSubmit={createProduct}
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
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(evt) => setTitle(evt.target.value)}
                    type="text"
                    placeholder="Enter title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={(evt) => setDescription(evt.target.value)}
                    type="text"
                    placeholder="Enter description"
                  />
                </Form.Group>
              </div>

              <div className="d-flex justify-content-between">
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    onChange={(evt) => setStock(evt.target.value)}
                    type="number"
                    placeholder="Enter stock"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    onChange={(evt) => setPrice(evt.target.value)}
                    type="number"
                    placeholder="Enter price"
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Url image</Form.Label>
                <Form.Control
                  onChange={(evt) => setUrl(evt.target.value)}
                  type="text"
                  placeholder="Enter url of an image"
                />
              </Form.Group>

              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : null}
        </div>
      </div>
    </div>
  );
}
