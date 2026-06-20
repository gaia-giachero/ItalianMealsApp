import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface MealCardProps {
  strMeal: string;
  strMealThumb: string;
  onPress: () => void;
}

export default function MealCard({
  strMeal,
  strMealThumb,
  onPress,
}: MealCardProps) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.direction}>
        <Image source={{ uri: strMealThumb }} style={styles.image} />
        <Text>{strMeal}</Text>
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
});
