import React from "react";

import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fetchItalianMeals } from "../../services/meals";
import { Ionicons } from "@expo/vector-icons";
import MealCard from "../../components/MealCard";
interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [mealsItems, setMealsItems] = React.useState<Meal[]>([]);
  const [err, setErr] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function meals() {
    setErr(undefined);
    setLoading(true);
    try {
      const mealsItem = await fetchItalianMeals();
      setMealsItems(mealsItem);
    } catch (err) {
      setErr("Riprova ricaricando la pagina");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    meals();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <ActivityIndicator size="small" color="#000" />
          <Text>Caricamento dei piatti in corso...</Text>
        </View>
      ) : err ? (
        <View>
          <Pressable onPress={meals}>
            <Ionicons name="refresh" size={24} color="black" />
          </Pressable>
          <Text>Riprova ricaricando la pagina</Text>
        </View>
      ) : (
        <FlatList
          data={mealsItems}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => {
            const path = `myapp://dettagli/${item.idMeal}`;

            return (
              <MealCard
                onPress={() =>
                  navigation.navigate("Details", {
                    id: item.idMeal,
                  })
                }
                strMeal={item.strMeal}
                strMealThumb={item.strMealThumb}
              />
            );
          }}
        />
      )}
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
