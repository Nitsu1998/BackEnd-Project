import { useState } from "react";
import socket from "./Socket";

export default function Products() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [productsArray, setProductsArray] = useState([]);

  socket.on("server:allProducts", (allProducts) => {
    setProductsArray([...allProducts]);
  });

  const handleSend = (event) => {
    event.preventDefault();
    const id = productsArray.length + 1;
    const product = { id, title, price, img };
    socket.emit("client:product", product);
    document.getElementById("form").reset();
  };

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <form id="form" onSubmit={handleSend}>
          <h2>Add Product</h2>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <br />
          <input
            type="number"
            name="price"
            placeholder="0"
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <br />
          <input
            type="text"
            name="img"
            placeholder="Url"
            onChange={(event) => setImg(event.target.value)}
            required
          />
          <br />
          <input type="submit" value="Send" />
        </form>
      </div>
      <div style={{ margin: "1rem" }}>
        <h2>Products</h2>
        <table
          style={{
            textAlign: "center",
            border: "2px solid black",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Title</th>
              <th>Price</th>
              <th>Img</th>
            </tr>
          </thead>
          {productsArray.map((product, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price} usd</td>
                  <td>
                    <img
                      src={product.img}
                      style={{ borderRadius: "0.2rem", margin: "0.5rem" }}
                      width="75px"
                      alt="..."
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
