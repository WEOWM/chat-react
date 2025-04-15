import React, { useState, useRef } from "react";
import Header from "./components/heads/Header";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";

const App = () => {
  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <div>
      {room ? (
       <Chat room={room}/>
      ) : (
        <div className="w-full min-h-screen flex flex-col  justify-center items-center">
          Enter Room Name: <input ref={roomInputRef} type="text" className="border mt-5 rounded-md" />
          <button onClick={() => setRoom(roomInputRef.current.value)} className="px-3 py-1 border mt-5 rounded-md">Enter Chat</button>
        </div>
      )}
    </div>
  );
};

export default App;
