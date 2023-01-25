import { View, Text, Image } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "../navigators/AppStack";

type HouseScreenRouteType = RouteProp<HomeStackParamList, "House">;

const HouseScreen = () => {
  const {
    params: { id, title, image, price, location, bedrooms, bathrooms },
  } = useRoute<HouseScreenRouteType>();

  console.log(title);
  return (
    <View>
      {/* <Text>House Item</Text> */}
      <Text>{title}</Text>
      <Text>{price}</Text>
      <Image source={{ uri: image }} className="w-24 h-24" />
      <Text>{location}</Text>
    </View>
  );
};

export default HouseScreen;
