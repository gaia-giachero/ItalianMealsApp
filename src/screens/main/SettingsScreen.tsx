import React from "react";
import { View, Text } from "react-native";

// import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialIcons name="engineering" size={48} color="orange" />
      <Text>Quando ho voglia la farò... per ora ti becchi questo :)</Text>
    </View>
  );
}
