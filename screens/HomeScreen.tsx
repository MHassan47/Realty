import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Filters from "../components/Filters";
import { selectUser } from "../redux/userSlice";
import Houses from "../components/Houses";

const Home = () => {
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <SafeAreaView className="bg-gray-100 flex-1 items-center">
      <Text className="text-lg font-semibold">{user.name}</Text>
      <View className="flex-row w-4/5 items-center space-x-2 p-2 rounded-lg">
        <View className="flex-row bg-gray-200 p-3 space-x-3 rounded-xl shadow-sm">
          <AntDesign name="search1" color="gray" size={20} />
          <TextInput
            placeholder="Search"
            keyboardType="default"
            onChangeText={(text) => setSearch(text)}
            className="flex-1 "
          />
        </View>
        <AntDesign
          name="filter"
          size={24}
          color="black"
          onPress={() => setFilterOpen((prev) => !prev)}
        />
      </View>

      {filterOpen && (
        <ScrollView
          horizontal
          contentContainerStyle={{ padding: 2 }}
          className="mb-4"
        >
          <Filters title="price" />
          <Filters title="Bedrooms" />
          <Filters title="Bathrooms" />
        </ScrollView>
      )}
      <Houses search={search} />
    </SafeAreaView>
  );
};

export default Home;
