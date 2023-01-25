import { View, Text, ScrollView } from "react-native";
import React from "react";
import HouseItem from "./HouseItem";
import { houses } from "../houseData";
const Houses = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {houses.map((house) => (
        <HouseItem
          key={house.id}
          id={house.id}
          title={house.title}
          image={house.image}
          price={house.price}
          location={house.location}
          bedrooms={house.rooms.bedrooms}
          bathrooms={house.rooms.bathrooms}
        />
      ))}
    </ScrollView>
  );
};

export default Houses;
