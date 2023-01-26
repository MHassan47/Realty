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
          scroll_images={house.scroll_images}
          price={house.price}
          location={house.location}
          address={house.address}
          longitude={house.longitude}
          latitude={house.latitude}
          bedrooms={house.rooms.bedrooms}
          bathrooms={house.rooms.bathrooms}
          size={house.size}
          cars={house.cars}
          description={house.description}
        />
      ))}
    </ScrollView>
  );
};

export default Houses;
