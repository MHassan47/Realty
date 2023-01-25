import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface props {
  id: string;
  title: string;
  image: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
}
const HouseItem: FC<props> = ({
  id,
  title,
  image,
  price,
  location,
  bedrooms,
  bathrooms,
}) => {
  return (
    <TouchableOpacity className="mb-4 bg-white pb-4 shadow-md rounded-md">
      <Image
        source={{
          uri: image,
        }}
        className="w-96 h-44 rounded-lg"
      />
      <View className="px-3 ">
        <View className="flex-row justify-between py-1">
          <Text className="text-lg font-semibold">{title}</Text>
          <Text className="text-lg font-semibold">${price}</Text>
        </View>
        <Text className="font-semibold text-sm mb-2">{location}</Text>
        <View className="flex-row space-x-5">
          <Text className="font-semibold">
            {bedrooms}{" "}
            <Text className="font-normal text-[#437370]">Bedrooms</Text>
          </Text>
          <Text className="font-semibold">
            {bedrooms}{" "}
            <Text className="font-normal text-[#437370]">Bathrooms</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HouseItem;
