import React from "react";

import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
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

export default function HomeScreen({ navigation, route }: any) {
  const [mealsItems, setMealsItems] = React.useState<Meal[]>([]);
  const [err, setErr] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const name = route.params?.name;
  const avatar = route.params?.avatar;

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

  function logout(){
    console.log('LOGOUT')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <Text style={styles.title}>{name}</Text>
        <Pressable onPress={logout}><Ionicons name="log-out-outline" size={24} color="#000" /></Pressable>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
  },
});
