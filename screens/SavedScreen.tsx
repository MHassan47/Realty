import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import HouseItem, { HouseType } from "../components/HouseItem";
import { selectHouses } from "../redux/houseSlice";

interface Likeditem {
  propertyID: string;
  userID: string;
}
const SavedScreen = () => {
  const [liked, setLiked] = useState<Likeditem[]>([]);
  const user = useSelector(selectUser);
  const properties = useSelector(selectHouses);
  const likedPropertiesRef = query(
    collection(db, "user_liked_properties"),
    where("userID", "==", user.id)
  );

  useEffect(() => {
    const getLiked = async () => {
      const likedPosts: Likeditem[] = [];
      const data = await getDocs(likedPropertiesRef);
      data.forEach((doc) => {
        likedPosts.push({
          ...doc.data(),
        } as Likeditem);
      });
      setLiked(likedPosts);
    };
    getLiked();
  }, []);

  console.log(liked.length);
  return (
    <SafeAreaView>
      <Text className="text-2xl p-4 font-semibold">Saved</Text>
      <ScrollView>
        {liked.map((item) => {
          const filteredProperty = properties.filter((property) => {
            return property.id === item.propertyID;
          });
          return filteredProperty.length ? (
            filteredProperty.map((property) => (
              <HouseItem
                key={property.id}
                id={property.id}
                image={property.image}
                scroll_images={property.scroll_images}
                price={property.price}
                location={property.location}
                address={property.address}
                longitude={property.longitude}
                latitude={property.latitude}
                rooms={property.rooms}
                size={property.size}
                cars={property.cars}
                description={property.description}
              />
            ))
          ) : (
            <Text>empty</Text>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;
