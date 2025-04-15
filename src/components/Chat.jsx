import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Firebase-config";

const Chat = ({ room }) => {
  const messageRef = collection(db, "message");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageRef = collection(db, "message");
    const querMessage = query(messageRef, where("room", "==", room), orderBy("createdAt"));

    const unsubscribe = onSnapshot(querMessage, (snapshot) => {
      let message = [];
      snapshot.forEach((doc) => {
        message.push({ ...doc.data(), id: doc.id });
      });
     
     
      setMessages(message);
      console.log("New Messages", message);
    });

    // Clean up the listener when component unmounts or room changes
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName || "Anonymous",
      room: room,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full min-h-screen flex flex-col  items-center px-3">
      <div className="w-full h-20 bg-red-500">
        <h1>Welcome Room: {room.toUpperCase()}</h1>
      </div>
      <div className="justify-start items-start flex flex-col w-full  ">
        {messages.map((messages) => {
          return (
            <div key={messages.id}>
             
             <div className="flex items-center justify-between  gap-3">
             <span className="text-[10px]">{messages.user}</span>
             <h2>{messages.text}</h2>
             </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="gap-3 flex mt-5 w-full">
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          type="text"
          className="w-full border py-1 rounded px-2"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          className="border px-2 py-1 rounded hover:bg-green-500 duration-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
