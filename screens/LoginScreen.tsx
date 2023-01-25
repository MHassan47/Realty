import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { authentication } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthParamList } from "../navigators/AuthStack";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthParamList, "Login">>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );

      dispatch(
        setUser({ name: user.displayName, email: user.email, id: user.uid })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center items-center"
      behavior="padding"
    >
      <View className="w-4/5">
        <TextInput
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          className="bg-white px-4 py-3 rounded-lg mt-2 "
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          className="bg-white px-3 py-3 rounded-lg mt-2 "
          secureTextEntry
        />
      </View>

      <View className="w-4/5 justify-center items-center mt-5 space-y-2">
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-blue-400 rounded-xl p-2 w-full items-center"
        >
          <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" rounded-xl p-2 w-full items-center"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-black font-bold text-md">
            Don't have an account? Register!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
