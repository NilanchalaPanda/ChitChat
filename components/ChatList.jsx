"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ChatBox from "./ChatBox";

const ChatList = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    try {
      const res = await fetch(`/api/users/${currentUser.id}`);
      const data = await res.json();
      setChats(data);
      console.log("CHATS - ", chats);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentUser) getChats();
  }, [currentUser]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="chat-list">
      <input type="search" placeholder="Search chat" className="input-search" />

      <div className="chats">
        {chats.map((chat) => (
          <ChatBox chat={chat} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
