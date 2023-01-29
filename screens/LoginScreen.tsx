import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { authentication } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthParamList } from "../navigators/AuthStack";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import loginImage from "../assets/login_image.jpg";
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
      className="flex-1 justify-center items-center bg-white space-y-14"
      behavior="padding"
    >
      <Image source={loginImage} className="w-2/3 h-1/3 object-scale-down" />
      <View className="w-4/5 space-y-4">
        <TextInput
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          className="bg-gray-200 px-4 py-3 rounded-lg mt-2 "
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          className="bg-gray-200 px-3 py-3 rounded-lg mt-2 "
          secureTextEntry
        />
      </View>

      <View className="w-4/5 justify-center items-center mt-5 space-y-2">
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-[#437370] rounded-xl p-2 w-full items-center"
        >
          <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" rounded-xl p-2 w-full items-center"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-black font-bold text-md">
            Don't have an account?{" "}
            <Text className="text-[#11a6a1]">Register!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
