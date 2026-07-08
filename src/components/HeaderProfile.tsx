import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getGlobalStyles } from "../theme/style";
import { SettingContext } from "../context/SettingContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function HeaderProfile() {
  const { name, avatarUri, logout } = useContext(AuthContext);
  const { currentColors } = useContext(SettingContext);
  const globalStyles = getGlobalStyles(currentColors);
  const navigation = useNavigation<any>();

  return (
    <View style={globalStyles.header}>
      <Pressable
        style={styles.avatarName}
        onPress={() => navigation.navigate("Setting")}
        accessibilityRole="button"
        accessibilityLabel="Vai alle impostazioni del profilo"
      >
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: currentColors.placeholder },
          ]}
        >
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        </View>
        <Text style={[styles.nomeCognome, { color: "#fff" }]}>{name}</Text>
      </Pressable>
      <Pressable
        onPress={logout}
        accessibilityRole="button"
        accessibilityLabel="Esci dall'account"
      >
        <Ionicons name="log-out-outline" size={25} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nomeCognome: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.9,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
  },
  avatar: {
    width: 52,
    height: 52,
  },
});
