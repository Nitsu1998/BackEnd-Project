import { useEffect } from "react";
import { useContext } from "react";
import { contextUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import NavBar from "../Navbar";

export default function Main() {
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
        <h2 className="text-center p-2">Welcome {user?.firstName} {user?.lastName}</h2>
      </div>
    </div>
  );
}
