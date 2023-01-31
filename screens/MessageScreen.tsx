import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ChatStackParamList } from "../navigators/AppStack";
import { GiftedChat } from "react-native-gifted-chat";
import { IMessage } from "react-native-gifted-chat/lib/Models";
import { v4 as uuidv4 } from "uuid";
type MessagesScreenRouteType = RouteProp<ChatStackParamList, "Messages">;

const MessageScreen = () => {
  const {
    params: { otherID },
  } = useRoute<MessagesScreenRouteType>();
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState<IMessage[]>([]);

  if (!user || !user.id || !user.name) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const combinedId = user.id < otherID ? user.id + otherID : otherID + user.id;
  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "message", combinedId), (doc) => {
        if (doc.exists()) {
          // console.log("-----", doc.data().messages);
          const data = doc.data().messages;
          const messageArray: IMessage[] = [...data];
          // messageArray.push(doc.data().messages);
          const formattedMessages = messageArray.reverse().map((message) => ({
            _id: message._id,
            text: message.text,
            createdAt: new Date(message.createdAt.toDate()),
            user: {
              _id: message.user._id,
              name: message.user.name,
            },
          }));
          console.log("=======", messageArray);
          setMessages(formattedMessages as IMessage[]);
        }
      });
      return () => {
        unsub();
      };
    };
    getMessages();
  }, []);

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const res = updateDoc(doc(db, "message", combinedId), {
      messages: arrayUnion({
        _id: messages[0]._id,
        text: messages[0].text,
        createdAt: messages[0].createdAt,
        user: { _id: messages[0].user._id, name: messages[0].user.name },
      }),
    });
  }, []);

  console.log(user.id);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
        name: user.name,
      }}
      renderAvatar={() => null}
      showAvatarForEveryMessage={true}
    />
  );
};

export default MessageScreen;
