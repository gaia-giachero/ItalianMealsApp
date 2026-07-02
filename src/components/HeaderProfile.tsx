import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { globalStyles } from "../theme/style";
import { AuthContext } from "../context/AuthContext";

export default function HeaderProfile() {
    const { name, avatarUri, logout } = useContext(AuthContext);

    return (
        < View style={globalStyles.header} >
            <View style={styles.avatarName}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                </View>
                <Text style={styles.nomeCognome}>{name}</Text>
            </View>
            <Pressable onPress={logout}>
                <Ionicons name="log-out-outline" size={25} color="black" />
            </Pressable>
        </View >
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
    color: "#000",
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: colors.placeholder,
  },
  avatar: {
    width: 52,
    height: 52,
  },
});