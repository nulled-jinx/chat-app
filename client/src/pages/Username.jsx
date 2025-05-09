const Username = ({ username, setUsername, room, setRoom, handleJoin }) => {
  return (
    <form onSubmit={handleJoin}>
      <h2>Join a Chat Room</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        required
      />
      <button type="submit">Join Chat</button>
    </form>
  );
};

export default Username;
