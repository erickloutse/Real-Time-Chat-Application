import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/chatroom/rooms",
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/chatroom/create",
        { name: roomName },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      setRoomName("");
      const res = await axios.get("http://localhost:4000/api/chatroom/rooms", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setRooms(res.data);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div>
      <h2>Chat Rooms</h2>
      <form onSubmit={createRoom}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Create a new room"
          required
        />
        <button type="submit">Create Room</button>
      </form>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.name}
            <button onClick={() => joinRoom(room._id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRooms;
