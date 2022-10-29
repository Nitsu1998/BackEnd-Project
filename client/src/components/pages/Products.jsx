import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { contextUser } from "../../context/userContext";

export default function Products(){
    const { logOut, user } = useContext(contextUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [user]);

    return(
        <div>
        <nav style={{ backgroundColor: "blue", height: "4rem", width: "100%", alignItems:"center"  }} className="d-flex justify-content-between">
          <div style={{listStyleType: "none", alignItems:"center", height: "100%", margin: "0rem", marginLeft:"1rem", color: "white"}} className="d-flex">
              <Link to="/messages">Messages</Link>
              <Link to="/products" className="m-2">Products</Link>
              <Link to="/cart">Cart</Link>
          </div>
          <span style={{color: "white"}}>user: {user?.email}</span>
          <button style={{marginRight: "1rem"}} onClick={logOut}>Log out</button>
        </nav>
        <div style={{backgroundColor: "GrayText", height: "calc(100vh - 4rem)", width: "100%"}}>
            PRODUCTOS
        </div>
      </div>
    )
}