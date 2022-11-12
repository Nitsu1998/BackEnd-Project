import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contextUser } from "../../context/userContext";
import NavBar from "../Navbar";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
axios.defaults.withCredentials = true;
const host = process.env.REACT_APP_HOST_API;

export default function Cart() {
  const { user, cartId, sessionExpired } = useContext(contextUser);
  const navigation = useRef(useNavigate());
  const [products, setProducts] = useState();

  const getProductsInCart = async () => {
    try {
      if (cartId) {
        const response = await axios.get(host + `/api/cart/${cartId}/products`);
        setProducts(response.data);
      }
    } catch (error) {
      sessionExpired();
    }
  };

  const deleteProductFromCart = async (idProd) => {
    try {
      const response = await axios.delete(
        host + `/api/cart/${cartId}/products/${idProd}`
      );
      console.log(response);
    } catch (error) {
      sessionExpired();
    }
  };

  useEffect(() => {
    if (!user) {
      navigation.current("/login");
    }
  }, [user]);

  useEffect(() => {
    getProductsInCart();
  }, []);

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundColor: "GrayText",
          height: "calc(100vh - 4rem)",
          width: "100%",
        }}
      >
        <div style={{ padding: "3rem" }}>
          {products ? (
            products.map((product, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1rem 8rem 8rem 8rem 8rem",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "1.5rem",
                    backgroundColor: "white",
                    borderBottom: "1px solid #13c1d8",
                  }}
                >
                  <span>{index}</span>
                  <img
                    style={{ width: "75px", height: "40px" }}
                    src={product.url}
                    alt="image Product"
                  />
                  <p>{product.title}</p>
                  <p>Price: {product.price}$</p>
                  <FaTrash
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteProductFromCart(product._id)}
                  />
                </div>
              );
            })
          ) : (
            <p>Not products added</p>
          )}
        </div>
      </div>
    </div>
  );
}
