import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HouseType } from "../components/HouseItem";
import type { RootState } from "./store";

// Define a type for the slice state
interface houseSlice {
  houses: HouseType[];
  house: {
    id: string | null;
    ownerId: string | null;
    image: string | null;
    scroll_images: string[] | null;
    price: number | null;
    location: string | null;
    address: string | null;
    longitude: number | null;
    latitude: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    size: number | null;
    cars: number | null;
    description: string | null;
  };
}

// Define the initial state using that type
const initialState: houseSlice = {
  houses: [],
  house: {
    id: null,
    ownerId: null,
    image: null,
    scroll_images: null,
    price: null,
    location: null,
    address: null,
    longitude: null,
    latitude: null,
    bedrooms: null,
    bathrooms: null,
    size: null,
    cars: null,
    description: null,
  },
};

export const houseSlice = createSlice({
  name: "house",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHouses: (state, action) => {
      state.houses = action.payload;
    },
  },
});

export const { setHouses } = houseSlice.actions;

export const selectHouses = (state: RootState) => state.house.houses;
export default houseSlice.reducer;
