import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

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
  onToggleFavorite,
}: MealCardProps) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.direction}>
        <Image source={{ uri: strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{strMeal}</Text>
      </Pressable>
      <Pressable onPress={onToggleFavorite} style={styles.prefer}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={32}
          color={isFavorite ? colors.error : colors.black}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: "92%",
    paddingLeft: 12,
    paddingTop: 9,
    paddingRight: 10,
    paddingBottom: 10,
    gap: 80,
    marginHorizontal: 15,
    marginBottom: 5,
    borderRadius: 8
  },
  direction: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  title: {
    fontSize: 15,
    color: colors.secondary,
    flexShrink: 1,
    fontWeight: "bold"
  },
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
