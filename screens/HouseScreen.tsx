import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "../navigators/AppStack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

type HouseScreenRouteType = RouteProp<HomeStackParamList, "House">;

const HouseScreen = () => {
  const {
    params: {
      id,
      title,
      image,
      price,
      location,
      address,
      longitude,
      latitude,
      bedrooms,
      bathrooms,
      size,
      cars,
      description,
    },
  } = useRoute<HouseScreenRouteType>();

  return (
    <>
      <ScrollView
        className="flex-1 m-6 space-y-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text>House Item</Text> */}
        <View className="space-y-4">
          <Image
            source={{ uri: image }}
            className="w-full p-4 h-80 rounded-xl shadow-xl "
          />
          <Text className="font-bold text-lg">{title}</Text>
          <View>
            <Text className="text-gray-500">{address}</Text>
            <Text className="text-gray-500">{location}</Text>
          </View>
          <View className="flex-row justify-evenly items-center w-full bg-gray-200 py-4 rounded-2xl">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="bed-outline" size={24} color="gray" />
              <Text>{bedrooms}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <MaterialCommunityIcons name="shower" size={24} color="gray" />
              <Text>{bathrooms}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Ionicons name="car-outline" size={24} color="gray" />
              <Text>{cars}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Ionicons name="md-resize-sharp" size={24} color="gray" />
              <Text>
                {size.toLocaleString()} ft{String.fromCharCode(178)}
              </Text>
            </View>
          </View>
          <Text className="text-gray-500 font-light text-lg">
            {description}
          </Text>
        </View>
        <View className=" w-full h-72 rounded-2xl overflow-hidden">
          <MapView
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.025,
              longitudeDelta: 0.025,
            }}
            mapType="mutedStandard"
            className="flex-1 "
            scrollEnabled={false}
            pitchEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              title={address}
              description={location}
              identifier="origin"
              pinColor="#11a6a1"
            />
          </MapView>
        </View>
      </ScrollView>
      <View className="absolute flex-row bottom-0 shadow-2xl w-screen bg-white py-8 px-6">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-[#11a6a1]">
            ${price.toLocaleString()}
          </Text>
          <Text>Total Price</Text>
        </View>
        <TouchableOpacity className="flex-row items-center bg-[#11a6a1] px-8 rounded-2xl">
          <Text className="text-white text-md font-light">Book Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HouseScreen;
