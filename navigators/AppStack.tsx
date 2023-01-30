import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { AntDesign, Ionicons, EvilIcons, Feather } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";

import { HouseType } from "../components/HouseItem";
import HouseScreen from "../screens/HouseScreen";
import SavedScreen from "../screens/SavedScreen";
import MessageScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen";
import { NavigatorScreenParams } from "@react-navigation/native";
const Tab = createBottomTabNavigator();

export type AppStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Saved: undefined;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  House: {
    id: string;
    ownerId: string;
    image: string;
    scroll_images: string[];
    price: number;
    location: string;
    address: string;
    longitude: number;
    latitude: number;
    rooms: { bedrooms: number; bathrooms: number };
    size: number;
    cars: number;
    description: string;
  };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="House"
        component={HouseScreen}
        options={{ presentation: "modal" }}
      />
    </HomeStack.Navigator>
  );
};

export type ChatStackParamList = {
  Chat: undefined;
  Messages: undefined;
};

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const ChatScreenStack = () => {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen
        name="Messages"
        component={MessageScreen}
        // options={{ presentation: "modal" }}
      />
    </ChatStack.Navigator>
  );
};
const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = "home";
            return <AntDesign name={"home"} size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <AntDesign name={"user"} size={size} color={color} />;
          } else if (route.name === "Saved") {
            return <AntDesign name="hearto" size={size} color={color} />;
          } else if (route.name === "ChatStack") {
            return <Feather name="message-square" size={size} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#437370",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeScreenStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen
        name="ChatStack"
        options={{ title: "Chat" }}
        component={ChatScreenStack}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;
