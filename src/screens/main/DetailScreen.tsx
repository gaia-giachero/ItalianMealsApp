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
import { globalStyles } from "../../theme/style";
import { colors } from "../../theme/colors";

interface DetailsMeals {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
}

export default function DetailsScreen({ route, navigation }: any) {
  const id = route.params?.idMeal;

  const [meal, setMeal] = React.useState<DetailsMeals>();
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
      <View style={[globalStyles.container, globalStyles.centered]}>
        <Text style={globalStyles.errorText}>Invalid deep link</Text>
        <Pressable
          style={[globalStyles.btn, styles.backHomeBtn]}
          onPress={() => navigation.goBack()}
        >
          <Text style={globalStyles.btnText}>Torna alla Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.black} />
      </Pressable>

      {loading ? (
        <View style={globalStyles.centered}>
          <ActivityIndicator size="small" color={colors.primaryAction} />
          <Text style={[globalStyles.text, styles.spacedTop]}>
            Caricamento del piatto in corso...
          </Text>
        </View>
      ) : error ? (
        <View style={globalStyles.centered}>
          <Pressable onPress={mealById}>
            <Ionicons name="refresh" size={24} color={colors.primaryAction} />
          </Pressable>
          <Text style={[globalStyles.text, styles.spacedTop]}>
            Riprova ricaricando la pagina
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View>
            <Image source={{ uri: meal?.strMealThumb }} style={styles.image} />
          </View>
          <Text style={[globalStyles.title, styles.spacedTop]}>
            {meal?.strMeal}
          </Text>
          <Text style={[globalStyles.title, styles.sectionTitle]}>
            INGREDIENTS
          </Text>
          {meal?.ingredients.map((i, index) => (
            <Text
              key={index.toString()}
              style={[globalStyles.text, styles.listItem]}
            >
              • {i}
            </Text>
          ))}
          <Text style={[globalStyles.title, styles.sectionTitle]}>STEPS</Text>
          <Text style={[globalStyles.text, styles.instructions]}>
            {meal?.strInstructions}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  backButton: {
    padding: 15,
  },
  backHomeBtn: {
    marginTop: 16,
    width: "80%",
  },
  content: {
    paddingHorizontal: 20,
  },
  spacedTop: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 8,
  },
  listItem: {
    marginBottom: 4,
  },
  instructions: {
    lineHeight: 22,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    backgroundColor: colors.placeholder,
  },
});
