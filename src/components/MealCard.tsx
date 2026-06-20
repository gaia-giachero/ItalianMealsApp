import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface MealCardProps {
  strMeal: string;
  strMealThumb: string;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function MealCard({
  strMeal,
  strMealThumb,
  onPress,
  isFavorite, 
  onToggleFavorite
}: MealCardProps) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.direction}>
        <Image source={{ uri: strMealThumb }} style={styles.image} />
        <Text>{strMeal}</Text>
      </Pressable>
      <Pressable onPress={onToggleFavorite} style={styles.prefer}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={32}
          color={isFavorite ? "red" : "black"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
  },
  direction: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  prefer: {
    justifyContent: "flex-end",
  }
});
