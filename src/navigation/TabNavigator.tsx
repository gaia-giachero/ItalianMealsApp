import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from "../screens/main/HomeScreen";
import DetailsScreen from "../screens/main/DetailScreen";
import SettingScreen from "../screens/main/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
    )
}