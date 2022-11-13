import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contextUser } from "../../context/userContext";
import NavBar from "../Navbar";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";
axios.defaults.withCredentials = true;
const host = process.env.REACT_APP_HOST_API;

export default function Cart() {
  const { user, cartId, handleCartId, sessionExpired } =
    useContext(contextUser);
  const navigation = useRef(useNavigate());
  const [products, setProducts] = useState();
  const [total, setTotal] = useState(0);

  const getProductsInCart = async () => {
    try {
      const response2 = await axios.get(host + "/api/cart", {
        id: user._id,
      });
      handleCartId(response2.data?._id);
      if (response2.data?._id) {
        const response = await axios.get(host + `/api/cart/${response2.data?._id}/products`);
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
      const productDeleted = response.data.products.find(
        (product) => product._id === idProd
      );
      swal({
        title: "Product deleted from cart!",
        text: `${productDeleted.title}`,
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      getProductsInCart();
    } catch (error) {
      sessionExpired();
    }
  };

  const deleteCart = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this cart!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        async function foo() {
          try {
            await axios.delete(host + `/api/cart/${cartId}`);
            swal("Poof! This cart has been deleted!", {
              icon: "success",
              buttons: false,
              timer: 2000,
            });
            handleCartId(null);
            setProducts([]);
          } catch (err) {
            sessionExpired();
          }
        }
        foo();
      } else {
        swal("This cart is safe!", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  const finishPurchase = async () => {
    try {
      await axios.post(host + `/api/cart/${cartId}/endPurchase`);
      swal({
        title: "Thanks for your purchase!",
        text: `You will recibe an email with the information`,
        icon: "success",
        buttons: false,
        timer: 4000,
      });
      await axios.delete(host + `/api/cart/${cartId}`);
      handleCartId(null);
      setProducts([]);
    } catch (err) {
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

  useEffect(() => {
    if (products && products.length !== 0) {
      let newTotal = 0;
      for (const product of products) {
        newTotal += product.amount * product.price;
        setTotal(newTotal);
      }
    }
  }, [products]);

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
        <h2
          style={{ color: "white", paddingTop: "1rem" }}
          className="text-center"
        >
          CART
        </h2>
        <div style={{ padding: "3rem" }}>
          {products && products.length !== 0 ? (
            <div>
              {products.map((product, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "5rem 8rem 7rem 5rem 6rem 1rem",
                      justifyContent: "space-around",
                      alignItems: "center",
                      padding: "1.5rem",
                      backgroundColor: "white",
                      borderBottom: "1px solid #13c1d8",
                    }}
                  >
                    <img
                      style={{ width: "75px", height: "40px" }}
                      src={product.url}
                      alt="image Product"
                    />
                    <span>{product.title}</span>
                    <span>Price: {product.price}$</span>
                    <span>Amount: {product.amount}</span>
                    <span>Subtotal: {product.price * product.amount}$</span>
                    <FaTrash
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteProductFromCart(product._id)}
                    />
                  </div>
                );
              })}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: " flex-end",
                  padding: "1rem",
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                }}
              >
                <p>Total: {total.toFixed(2)} $</p>

                <div>
                  <button
                    style={{ marginRight: "1rem" }}
                    onClick={() => deleteCart()}
                  >
                    CLEAR CART
                  </button>

                  <button onClick={() => finishPurchase()}>
                    FINISH PURCHASE
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Not products added</p>
          )}
        </div>
      </div>
    </div>
  );
}
