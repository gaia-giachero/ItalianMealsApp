import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import FavButton from "./FavButton";
import { FavoritesContext } from "../context/FavoritesContext";

interface MealCardProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  onPress: () => void;
}


export default function MealCard({
  idMeal, 
  strMeal,
  strMealThumb,
  onPress
}: MealCardProps) {

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.direction}>
        <Image source={{ uri: strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{strMeal}</Text>
      </Pressable>
      <FavButton
        isFavorite={favorites.includes(idMeal)}
        onToggleFavorite={() => toggleFavorite(idMeal)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#aaaaaa",
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
