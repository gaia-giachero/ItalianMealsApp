import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/auth/LoginScreen";
import DetailsScreen from "../screens/main/DetailScreen";
import TabNavigator from "./TabNavigator";
import { colors } from "../theme/colors";
import * as Linking from 'expo-linking';
import { SettingContext } from "../context/SettingContext";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/"), "italiamealsapp://"],
  config: {
    screens: {
      Login: "login",
      MainTab: "main tab",
      Details: "meal/:idMeal",
    },
  },
};

export default function AppNavigator() {
  const { isLogged } = useContext(AuthContext);
  const { currentColors } = useContext(SettingContext)

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: currentColors.primary },
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
