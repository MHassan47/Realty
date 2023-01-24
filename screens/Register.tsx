import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { authentication } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthParamList } from "../navigators/AuthStack";

const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthParamList, "Register">>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
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
          onPress={handleSignUp}
          className="bg-blue-400 rounded-xl p-2 w-full items-center"
        >
          <Text className="text-white font-bold text-lg">Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className=" rounded-xl p-2 w-full items-center"
        >
          <Text className="text-black font-bold text-md">
            Already have an account? Login!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
