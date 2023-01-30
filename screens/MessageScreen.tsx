import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
interface messageType {
  createdAt: string;
  text: string;
}
const MessageScreen = () => {
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState<messageType[]>([]);
  const messagesCol = collection(db, "messages");
  const q = query(messagesCol, orderBy("createdAt"), limit(25));

  //   useEffect(() => {
  //     const getMessages = async () => {
  //       const messageArray: messageType[] = [];
  //       const data = await getDocs(q);
  //       data.forEach((doc) => {
  //         messageArray.push({
  //           ...doc.data(),
  //         } as messageType);
  //       });
  //       setMessages(messageArray);
  //     };
  //     getMessages();
  //   }, []);

  console.log(messages);
  return (
    <SafeAreaView>
      {messages.map((message) => (
        <View key={message.createdAt}>
          <Text>{message.text}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default MessageScreen;
