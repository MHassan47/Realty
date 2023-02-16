import {
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatStackParamList } from "../navigators/AppStack";

interface chatType {
  // createdAt: { nanoseconds: number; seconds: number };
  // userInfo: { displayName: string; uid: string };
  participants: string[];
}

interface othersType {
  uid: string;
  displayName: string;
  email: string;
}

const ChatScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatStackParamList, "Chat">>();
  const [chats, setChats] = useState<chatType[]>([]);
  const [others, setOthers] = useState<othersType[]>([]);
  const user = useSelector(selectUser);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    // const chatsArray: chatType[] = [];
    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.id)
    );
    const getChats = () => {
      if (user.id) {
        const unsub = onSnapshot(q, (querySnapshot) => {
          const chats: chatType[] = [];
          querySnapshot.forEach((doc) => {
            chats.push(doc.data() as chatType);
          });
          const otherUsers: string[] = [];
          chats.map((chat) =>
            chat.participants.map((participant) => {
              if (participant !== user.id) otherUsers.push(participant);
            })
          );
          const promises = otherUsers.map((user) => {
            return new Promise((resolve) => {
              onSnapshot(doc(db, "users", user), (doc) => {
                resolve(doc.data() as othersType);
              });
            });
          });

          Promise.all(promises).then((otherStates) => {
            setOthers(otherStates as othersType[]);
          });
        });

        return () => {
          unsub();
        };
      }
    };

    getChats();
  }, [user.id]);

  console.log("-----", others.length);
  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {others?.map((chat) => (
          <TouchableOpacity
            key={chat.uid}
            className="flex-row items-center justify-between mx-4 bg-gray-100 shadow-sm h-20 mt-4 rounded-2xl"
            onPress={() =>
              navigation.navigate("Messages", { otherID: chat.uid })
            }
          >
            <Text className="text-lg font-semibold px-4 text-gray-600">
              {chat.displayName}
            </Text>
            <View className="bg-[#437370] p-3 rounded-2xl mr-6">
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
