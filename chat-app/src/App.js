import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/chatrooms" element={<ChatRooms />} />
          <Route path="/chatroom/:roomId" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
