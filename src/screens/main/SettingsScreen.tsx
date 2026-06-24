import React from "react";
import { View, Text } from "react-native";

// import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../theme/style";
import { colors } from "../../theme/colors";

export default function SettingScreen() {
  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <MaterialIcons name="engineering" size={48} color={colors.warning} />
      <Text
        style={[
          globalStyles.text,
          { marginTop: 12, textAlign: "center", paddingHorizontal: 30 },
        ]}
      >
        Quando ho voglia la farò... per ora ti becchi questo :)
      </Text>
    </View>
  );
}
