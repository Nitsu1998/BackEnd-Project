import "./App.css";
import React from "react";
import Chat from "./components/Chat";
import Products from "./components/Products";

function App() {

  return (
    <div className="App">
        <Products />
        <Chat />
    </div>
  );
}

export default App;
