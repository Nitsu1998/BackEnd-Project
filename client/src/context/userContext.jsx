import axios from "axios";
import { createContext, useState } from "react";
export const contextUser = createContext();
axios.defaults.withCredentials = true;
const { Provider } = contextUser;

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [message, setMessage] = useState(null);
  const host = process.env.REACT_APP_HOST;

  const register = async (newUser) => {
    try {
      setMessage(null);
      const response = await axios.post(host + "/register", newUser);
      setMessage(`${response.statusText} account ${response.data}`);
      return true
    } catch (err) {
      setUser(null);
      setMessage(err.response.data.message);
      return;
    }
  };

  const logOut = async() => {
    setUser(null);
    const response = await axios.post(host + "/logout");
    console.log(response)
  };

  const login = async (userLogin) => {
    try {
      setMessage(null);
      const response = await axios.post(host + "/login", userLogin);
      setUser(response.data);
      return;
    } catch (err) {
      setUser(null);
      setMessage(err.response.data.message);
      return;
    }
  };

  const UserContext = {
    login,
    logOut,
    register,
    user,
    message,
  };

  return <Provider value={UserContext}>{children}</Provider>;
}
