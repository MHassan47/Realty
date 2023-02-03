import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackParamList, HomeStackParamList } from "../navigators/AppStack";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { v4 as uuidv4 } from "uuid";
type HouseScreenRouteType = RouteProp<HomeStackParamList, "House">;

const HouseScreen = () => {
  const user = useSelector(selectUser);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "HomeStack">>();
  const {
    params: {
      id,
      ownerId,
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
    },
  } = useRoute<HouseScreenRouteType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [hearted, setHearted] = useState(false);
  if (!user || !user.id || !user.name) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const combinedId = user.id < ownerId ? user.id + ownerId : ownerId + user.id;

  const onBookNowPress = async () => {
    const chatExists = await getDoc(doc(db, "chats", combinedId));
    console.log(chatExists);
    if (!chatExists.exists()) {
      await addDoc(collection(db, "chats"), {
        participants: [user.id, ownerId],
      });
      await setDoc(doc(db, "message", combinedId), {
        messages: [],
      });
    }
    navigation.navigate("ChatStack", {
      screen: "Messages",
      params: { otherID: ownerId },
    });
  };

  const handleImagePress = (image: string) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleHeart = async () => {
    const q = query(
      collection(db, "user_liked_properties"),
      where("propertyID", "==", id),
      where("userID", "==", user.id)
    );
    const isHearted = await getDocs(q);
    console.log(isHearted.empty);
    if (isHearted.empty) {
      const res = await addDoc(collection(db, "user_liked_properties"), {
        propertyID: id,
        userID: user.id,
      });
      setHearted(true);
    }
  };
  useEffect(() => {
    const checkHeart = async () => {
      const q = query(
        collection(db, "user_liked_properties"),
        where("propertyID", "==", id),
        where("userID", "==", user.id)
      );
      const isHearted = await getDocs(q);
      console.log(isHearted.empty);
      if (!isHearted.empty) {
        setHearted(true);
      }
    };
    checkHeart();
  }, [id]);
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
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-gray-500">{address}</Text>
              <Text className="text-gray-500">{location}</Text>
            </View>

            {/* heart  */}
            <TouchableOpacity onPress={handleHeart} disabled={hearted}>
              {hearted ? (
                <AntDesign name="heart" size={28} color="#675151" />
              ) : (
                <AntDesign name="hearto" size={28} color="gray" />
              )}
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-evenly items-center w-full bg-gray-200 py-4 rounded-2xl">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="bed-outline" size={24} color="gray" />
              <Text>{rooms.bedrooms}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <MaterialCommunityIcons name="shower" size={24} color="gray" />
              <Text>{rooms.bathrooms}</Text>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {scroll_images?.map((item) => (
            <TouchableOpacity key={item} onPress={() => handleImagePress(item)}>
              <Image
                source={{ uri: item }}
                className="w-52 h-40 mr-3 rounded-xl"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          className="bg-black opacity-25"
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
          >
            <TouchableOpacity
              className=" z-99 "
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-3xl text-white ">X</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-2/5 rounded-2xl object-fill"
            />
          </View>
        </Modal>

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
        <TouchableOpacity
          className="flex-row items-center bg-[#11a6a1] px-8 rounded-2xl"
          onPress={onBookNowPress}
        >
          <Text className="text-white text-md font-light">Book Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HouseScreen;
