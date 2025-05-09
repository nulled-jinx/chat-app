import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;
const socket = io(`${backend_url}`);

const Chat = ({ username, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join_room", room);

    axios.get(`${backend_url}/messages/${room}`).then((res) => {
      setMessages(res.data);
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const msgData = {
      username,
      message,
      room,
      timeStamp: new Date().toISOString(),
    };

    socket.emit("send_message", msgData);

    await axios.post(`${backend_url}/messages`, msgData);

    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div>
      <h1>
        {username} in Room: <strong>{room}</strong>
      </h1>
      <div className="chat-app">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "70%" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
