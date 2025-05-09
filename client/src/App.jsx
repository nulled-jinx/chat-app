import { useState } from "react";
import Chat from "./pages/Chat";
import Username from "./pages/Username";

function App() {
  const [username, setUsername] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      setHasJoined(true);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className="app" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <img
        id="toggle-icon"
        src="/switch-theme-icon.png"
        alt="Switch Theme"
        onClick={toggleDarkMode}
      />
      {!hasJoined ? (
        <Username
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          handleJoin={handleJoin}
        />
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
}

export default App;
