import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface props {
  title: string;
}
const Filters: FC<props> = ({ title }) => {
  return (
    <TouchableOpacity>
      <Text className="flex-row items-center text-md justify-center font-semilight p-2 mr-6 rounded-xl shadow-sm bg-gray-100">
        {title}
        <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
      </Text>
    </TouchableOpacity>
  );
};

export default Filters;
