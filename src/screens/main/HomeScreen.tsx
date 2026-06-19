import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { loadMeals } from "../../hooks/loadMeals";
import React from "react";

export default function HomeScreen({ navigation }: { navigation: any }) {
  interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string;
  }

  const [mealsItems, setMealsItems] = React.useState<Meal[]>([]);

  React.useEffect(() => {
    loadMeals(setMealsItems);
  }, [setMealsItems]);

  return (
    <View style={styles.container}>
      <FlatList
        data={mealsItems}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => {
          const path = `myapp://dettagli/${item.idMeal}`;

          return (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate("Details", {
                  id: item.idMeal,
                })
              }
            >
              <Text style={styles.title}>{item.strMeal}</Text>
              <Text style={styles.description}>{item.strCategory}</Text>
              <Text style={styles.link}>{path}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  link: {
    marginTop: 8,
    fontSize: 12,
    color: "#007aff",
  },
});
