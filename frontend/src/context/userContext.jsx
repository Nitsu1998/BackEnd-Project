import axios from "axios";
import { createContext, useState } from "react";
export const contextUser = createContext();
const { Provider } = contextUser;
axios.defaults.withCredentials = true;
const host = process.env.REACT_APP_HOST_API;

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartId, setCartId] = useState();
  const [message, setMessage] = useState(null);

  const register = async (newUser) => {
    try {
      setMessage(null);
      const response = await axios.post(host + "/register", newUser);
      setMessage(`${response.statusText} account ${response.data}`);
      return true;
    } catch (err) {
      setUser(null);
      setMessage(err.response.data.message);
      return;
    }
  };

  const logOut = async () => {
    try {
      setUser(null);
      setCartId(null);
      const response = await axios.post(host + "/logout");
      setMessage(response.data);
      return;
    } catch {
      setUser(null);
      return;
    }
  };

  const login = async (userLogin) => {
    try {
      setMessage(null);
      const response = await axios.post(host + "/login", userLogin);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data))
      const response2 = await axios.get(host + "/api/cart", {
        id: response.data._id,
      });
      setCartId(response2.data?._id);
      return;
    } catch (err) {
      setUser(null);
      setMessage(err.response.data.message);
      return;
    }
  };

  const sessionExpired = () => {
    setMessage("Session expired, please login again");
    setUser(null);
    setCartId(null);
  };

  const handleMessage = (message) => {
    setMessage(message);
  };

  const handleCartId = (id) => {
    setCartId(id);
  };

  const UserContext = {
    login,
    logOut,
    register,
    sessionExpired,
    handleMessage,
    handleCartId,
    user,
    cartId,
    message,
  };

  return <Provider value={UserContext}>{children}</Provider>;
}
