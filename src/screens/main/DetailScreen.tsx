import React, { useContext } from "react";
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
import { getGlobalStyles } from "../../theme/style";
import { colors } from "../../theme/colors";
import FavButton from "../../components/FavButton";
import { FavoritesContext } from "../../context/FavoritesContext";
import { SettingContext } from "../../context/SettingContext";

interface DetailsMeals {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
}

export default function DetailsScreen({ route, navigation }: any) {
  const id = route.params?.idMeal;
  const { currentColors } = useContext(SettingContext);
  const globalStyles = getGlobalStyles(currentColors);

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

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={styles.scrollContent}
    >

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
            Riprova ricaricando la pagina o torna alla HomePage
          </Text>
          {/* implementare bottone o altro modo per tornare alla homepage */}
        </View>
      ) : (
        <View style={styles.content}>
          {/* HEADER */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: meal?.strMealThumb }} style={styles.image} />
            <View style={styles.imageOverlay}>
              <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={colors.black} />
              </Pressable>
              <FavButton
                isFavorite={favorites.includes(id)}
                onToggleFavorite={() => toggleFavorite(id)}
              />
            </View>
          </View>

          {/* TITLE */}
          <Text style={[globalStyles.title, styles.spacedTop]}>
            {meal?.strMeal}
          </Text>

          {/* INGREDIENTS */}
          <View style={[styles.container, {backgroundColor: currentColors.accent}]}>
            <Text style={[globalStyles.title, styles.sectionTitle, { color: 'white' }]}>
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
          </View>

          {/* STEPS */}
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
    backgroundColor: '#c2c2c2',
    width: 50,
    height: 50,
    borderRadius: '100%',
    margin: 5,
    textAlign: 'center',
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
    color: 'white'
  },
  instructions: {
    lineHeight: 22,
  },
  container: {
    paddingLeft: 30,
    paddingBottom: 30,
    borderRadius: 20,
    marginTop: 10,
  },

  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    borderRadius: 35,
  },
  imageOverlay: {
    position: "absolute",
    top: 26,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});
