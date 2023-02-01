import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Filters from "../components/Filters";
import { selectUser } from "../redux/userSlice";
import Houses from "../components/Houses";
import { selectHouses, setHouses } from "../redux/houseSlice";
import { HouseType } from "../components/HouseItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const propertiesRef = collection(db, "properties");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const housesData = useSelector(selectHouses);
  const [data, setData] = useState<HouseType[]>([]);

  useEffect(() => {
    const getProperties = async () => {
      const properties: HouseType[] = [];
      const data = await getDocs(propertiesRef);
      data.forEach((doc) => {
        properties.push({
          ...doc.data(),
          id: doc.id,
        } as HouseType);
      });
      dispatch(setHouses(properties));
      setData(housesData);
    };
    getProperties();
  }, []);

  useEffect(() => {
    setData(housesData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [housesData]);

  const handleSearch = (search: string) => {
    if (!search.length) return setData(housesData);
    const filteredHouseData = housesData.filter((item) =>
      item.location.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredHouseData.length) {
      setData(filteredHouseData);
    } else {
      setData(housesData);
    }
  };

  // console.log(data);

  return (
    <SafeAreaView className="bg-gray-100 flex-1 items-center">
      <Text className="text-lg font-semibold">{user.name}</Text>
      <View className="flex-row w-4/5 items-center space-x-2 p-2 rounded-lg">
        <View className="flex-row bg-gray-200 p-3 space-x-3 rounded-xl shadow-sm">
          <AntDesign name="search1" color="gray" size={20} />
          <TextInput
            placeholder="Search"
            keyboardType="default"
            onChangeText={handleSearch}
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
      {loading ? <Loading /> : <Houses data={data} />}
    </SafeAreaView>
  );
};

export default Home;
