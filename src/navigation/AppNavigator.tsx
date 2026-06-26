import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/auth/LoginScreen";
import DetailsScreen from "../screens/main/DetailScreen";
import TabNavigator from "./TabNavigator";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ["exp://"],
  config: {
    screens: {
      Login: "login",
      MainTab: "main tab",
      Details: "dettagli/:id",
    },
  },
};

export default function AppNavigator() {
  const { isLogged } = useContext(AuthContext);
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.primary },
        }}
      >
        {isLogged ? (
          <>
            <Stack.Screen name="MainTab" component={TabNavigator} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
