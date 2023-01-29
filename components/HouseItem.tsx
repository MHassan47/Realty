import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigators/AppStack";
export interface HouseType {
  id: string;
  // title: string;
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
}

const HouseItem: FC<HouseType> = ({
  id,
  image,
  scroll_images,
  price,
  location,
  address,
  longitude,
  latitude,
  rooms,
  size,
  cars,
  description,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, "Home">>();
  return (
    <TouchableOpacity
      className="mb-4 bg-white pb-4 shadow-md rounded-md"
      onPress={() =>
        navigation.navigate("House", {
          id,
          image,
          scroll_images,
          price,
          location,
          address,
          longitude,
          latitude,
          rooms,
          size,
          cars,
          description,
        })
      }
    >
      <Image
        source={{
          uri: image,
        }}
        className="w-96 h-44 rounded-lg"
      />
      <View className="px-3 ">
        <View className="flex-row justify-between py-1">
          <Text className="text-lg font-semibold">
            ${price.toLocaleString()}
          </Text>
        </View>
        <Text className="font-semibold text-sm mb-2">{location}</Text>
        <View className="flex-row space-x-5">
          <Text className="font-semibold">
            {rooms.bedrooms}{" "}
            <Text className="font-normal text-[#437370]">Bedrooms</Text>
          </Text>
          <Text className="font-semibold">
            {rooms.bathrooms}{" "}
            <Text className="font-normal text-[#437370]">Bathrooms</Text>
          </Text>
          <Text className="font-semibold">
            {size.toLocaleString()}{" "}
            <Text className="font-normal text-[#437370]">
              ft{String.fromCharCode(178)}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HouseItem;
