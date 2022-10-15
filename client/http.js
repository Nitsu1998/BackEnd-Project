import axios from "axios";

(async function login() {
  const response = await axios.post("http://localhost:8080/login", {
    username: "nitsu98",
    password: "agus1234",
  });
  console.log(response.data);
})();

// (getProducts = async () => {
//   const respose = await axios.get("/api/products");
// })()
