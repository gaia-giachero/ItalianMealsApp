import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import FavButton from "./FavButton";
import { FavoritesContext } from "../context/FavoritesContext";
import { SettingContext } from "../context/SettingContext";

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
  onPress,
}: MealCardProps) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { currentColors } = useContext(SettingContext);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentColors.primary,
          borderColor: currentColors.placeholder,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={styles.direction}
        accessibilityRole="button"
        accessibilityLabel={`Vedi i dettagli di ${strMeal}`}
      >
        <Image source={{ uri: strMealThumb }} style={styles.image} />
        <Text style={[styles.title, { color: currentColors.secondary }]}>
          {strMeal}
        </Text>
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
    borderStyle: "solid",
    borderWidth: 1,
    width: "92%",
    paddingLeft: 12,
    paddingTop: 9,
    paddingRight: 10,
    paddingBottom: 10,
    gap: 80,
    marginHorizontal: 15,
    marginBottom: 5,
    borderRadius: 8,
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
    flexShrink: 1,
    fontWeight: "bold",
  }
});
