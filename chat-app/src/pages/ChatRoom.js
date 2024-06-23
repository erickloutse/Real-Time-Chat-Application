import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.emit("joinRoom", roomId);

    socketRef.current.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/chatroom/${roomId}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setMessages(res.data.messages);
    };
    fetchMessages();
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      room: roomId,
      user: "current_user", // Remplacer par le nom d'utilisateur actuel
      content: message,
    };
    socketRef.current.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.content}{" "}
            <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
