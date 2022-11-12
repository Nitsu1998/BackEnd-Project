import { useContext } from "react";
import { Link } from "react-router-dom";
import { contextUser } from "../context/userContext";

export default function NavBar(){
    const { logOut, user } = useContext(contextUser);
    return(
        <nav style={{ backgroundColor: "blue", height: "4rem", width: "100%", alignItems:"center"  }} className="d-flex justify-content-between">
          <div style={{ alignItems:"center", height: "100%", margin: "0rem", marginLeft:"1rem"}} className="d-flex">
              <Link style={{color: "white", textDecoration: "none"}} to="/messages">Messages</Link>
              <Link style={{color: "white", textDecoration: "none"}} to="/products" className="m-2">Products</Link>
              <Link style={{color: "white", textDecoration: "none"}} to="/cart">Cart</Link>
          </div>
          <div>
            <span style={{color: "white", marginRight: "2rem"}}>user: {user?.email}</span>
            <button style={{marginRight: "1rem"}} onClick={()=>logOut()}>Log out</button>
          </div>
        </nav>
    )
}