import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

interface chatType {
  createdAt: { nanoseconds: number; seconds: number };
  userInfo: { displayName: string; uid: string };
}

const ChatScreen = () => {
  const [chats, setChats] = useState<chatType[]>([]);
  const user = useSelector(selectUser);
  useEffect(() => {
    const chatsArray: chatType[] = [];
    const getChats = () => {
      if (user.id) {
        const unsub = onSnapshot(doc(db, "chats", user.id), (doc) => {
          const data = doc.data();
          if (data) {
            setChats([data as chatType]);
          }
        });
        // setChats(chatsArray);

        return () => {
          unsub();
        };
      }
    };

    getChats();
  }, []);

  console.log("+++++++++++", chats);
  return (
    <SafeAreaView>
      <ScrollView>
        {chats?.map((chat) => (
          <TouchableOpacity key={chat.createdAt.seconds}>
            <Text>{chat.userInfo.displayName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
