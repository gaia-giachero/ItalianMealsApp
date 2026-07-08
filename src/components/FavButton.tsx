import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { SettingContext } from "../context/SettingContext";

interface FavButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function FavButton({
  isFavorite,
  onToggleFavorite,
}: FavButtonProps) {
  const { currentColors } = useContext(SettingContext);

  return (
    <Pressable
      onPress={onToggleFavorite}
      style={[
        styles.prefer,
        {
          backgroundColor: currentColors.primary,
          borderColor: currentColors.placeholder,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={
        isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
      }
      accessibilityState={{ selected: isFavorite }}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={32}
        color={isFavorite ? currentColors.error : currentColors.black}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  prefer: {
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    width: 45,
  },
});
