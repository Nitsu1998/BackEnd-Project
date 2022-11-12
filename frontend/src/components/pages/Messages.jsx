import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contextUser } from "../../context/userContext";
import NavBar from "../Navbar";

export default function Messages() {
  const { user } = useContext(contextUser);
  const navigation = useRef(useNavigate());

  useEffect(() => {
    if (!user) {
      navigation.current("/login");
    }
  }, [user]);

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
        MENSAJES
      </div>
    </div>
  );
}
