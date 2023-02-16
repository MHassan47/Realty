import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ChatStackParamList } from "../navigators/AppStack";
import { GiftedChat } from "react-native-gifted-chat";
import { IMessage } from "react-native-gifted-chat/lib/Models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
type MessagesScreenRouteType = RouteProp<ChatStackParamList, "Messages">;

const MessageScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatStackParamList, "Messages">>();
  const {
    params: { otherID },
  } = useRoute<MessagesScreenRouteType>();
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const getTargetUser = async () => {
      const targetUser = await getDoc(doc(db, "users", otherID));
      if (targetUser.exists())
        navigation.setOptions({
          headerTitle: targetUser.data().displayName,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
              <Ionicons name="ios-arrow-back" size={24} color="#437370" />
            </TouchableOpacity>
          ),
        });
    };
    getTargetUser();
  }, []);

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
