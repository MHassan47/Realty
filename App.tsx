import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import { AuthStack } from "./navigators/AuthStack";
import AppStack from "./navigators/AppStack";

const Stack = createNativeStackNavigator();

export default function App() {
  const user = true;
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
