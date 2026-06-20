import React from "react";
import {
  Text,
  Pressable,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { fetchMealById } from "../../services/meals";
import { Ionicons } from "@expo/vector-icons";

interface DetailsMeals {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
}

export default function DetailsScreen({ route, navigation }: any) {
  const id = route.params?.id;

  const [meal, setMeal] = React.useState<DetailsMeals | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);

  async function mealById() {
    setError(undefined);
    setLoading(true);
    try {
      const detailsItem = await fetchMealById(id);
      setMeal(detailsItem);
    } catch (errore) {
      setError("Riprova ricaricando la pagina");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    mealById();
  }, []);

  if (!id) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Invalid deep link</Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Torna alla Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView>
      {loading ? (
        <View>
          <ActivityIndicator size="small" color="#000" />
          <Text>Caricamento del piatto in corso...</Text>
        </View>
      ) : error ? (
        <View>
          <Pressable onPress={mealById}>
            <Ionicons name="refresh" size={24} color="black" />
          </Pressable>
          <Text>Riprova ricaricando la pagina</Text>
        </View>
      ) : (
        <View>
          <Image source={{ uri: meal?.strMealThumb }} style={styles.image} />
          <Text>{meal?.strMeal}</Text>
          {meal?.ingredients.map((i, index) => 
            <Text key={index.toString()}>{i}</Text>
          )}
          <Text>{meal?.strInstructions}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  idText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007aff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
  },
});
