import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";
import AppStack from "./navigators/AppStack";
import { AuthStack } from "./navigators/AuthStack";

const Routes = () => {
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      {user.id ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
