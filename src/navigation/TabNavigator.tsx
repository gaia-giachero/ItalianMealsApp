import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, StyleSheet } from "react-native";

import HomeScreen from "../screens/main/HomeScreen";
import SettingScreen from "../screens/main/SettingsScreen";
import { colors } from "../theme/colors";
import FavouriteScreen from "../screens/main/FavouriteScreen";

const Tab = createBottomTabNavigator();

function CustomTabButton(props: any) {
  return (
    <Pressable {...props} style={styles.tabButton}>
      <View style={styles.tabButtonInner}>{props.children}</View>
    </Pressable>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        sceneStyle: { backgroundColor: colors.primary },
        tabBarStyle: {
          backgroundColor: "rgb(146, 177, 255)",
          borderTopWidth: 0,
          height: 67,
          position: "absolute",
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 0,
          borderRadius: 24,
          elevation: 10,
          paddingBottom: 0,
          zIndex: 999,
        },
        tabBarButton: (props) => <CustomTabButton {...props} />,
        tabBarActiveTintColor: colors.primaryAction,
        tabBarInactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
  },
  tabButtonInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
