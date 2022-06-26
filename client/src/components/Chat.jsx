import { useState } from "react";
import socket from "./Socket";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);

  socket.on("server:allMessages", (allMessagesInfo) => {
    setMessagesArray([...allMessagesInfo]);
  });

  const handleSend = (event) => {
    event.preventDefault();
    const date = new Date().toLocaleString().replace(",", "");
    const messageInfo = { username, date, message };
    socket.emit("client:message", messageInfo);
    document.getElementById("text").value = "";
  };

  return (
    <div style={{ margin: "1rem"}}>
      <h2>Chat</h2>
      <form onSubmit={handleSend}>
        <input
          type="email"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Email"
          required
        />
        <div>
          {messagesArray.map((messageInfo, index) => {
            return (
              <div key={index}>
                <p>
                  <b style={{ color: "blue" }}>{messageInfo.username}</b>{" "}
                  <span style={{ color: "brown" }}>[{messageInfo.date}]</span>:{" "}
                  <i style={{ color: "green" }}>{messageInfo.message}</i>
                </p>
              </div>
            );
          })}
        </div>
        <input
          type="text"
          id="text"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message"
          required
        />
        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}
