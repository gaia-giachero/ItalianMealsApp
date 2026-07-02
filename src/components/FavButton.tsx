import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

interface FavButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function FavButton({
  isFavorite,
  onToggleFavorite,
}: FavButtonProps) {
  return (
      <Pressable onPress={onToggleFavorite} style={styles.prefer}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={32}
          color={isFavorite ? colors.error : colors.black}
        />
      </Pressable>
  );
}

const styles = StyleSheet.create({
  prefer: {
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: colors.placeholder,
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    width: 45,
  },
});
