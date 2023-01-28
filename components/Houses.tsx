import { ScrollView } from "react-native";
import React, { FC, useState } from "react";
import HouseItem, { HouseType } from "./HouseItem";

interface props {
  data: HouseType[];
}
const Houses: FC<props> = ({ data }) => {
  // console.log(data);
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {data.map((house) => (
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
          bedrooms={house.bedrooms}
          bathrooms={house.bathrooms}
          size={house.size}
          cars={house.cars}
          description={house.description}
        />
      ))}
    </ScrollView>
  );
};

export default Houses;
