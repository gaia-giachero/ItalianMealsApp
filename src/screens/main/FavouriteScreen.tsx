import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getGlobalStyles } from "../../theme/style";
import { Ionicons } from "@expo/vector-icons";
import { SettingContext } from "../../context/SettingContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import { fetchItalianMeals } from "../../services/meals";
import MealCard from "../../components/MealCard";
import HeaderProfile from "../../components/HeaderProfile";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function FavouriteScreen({ navigation }: any) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { currentColors } = useContext(SettingContext);
  const globalStyles = getGlobalStyles(currentColors);

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

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  async function handleRefresh() {
    setIsRefreshing(true);
    await meals();
    setIsRefreshing(false);
  }

  // FILTRO 
  const filteredMeals = mealsItems.filter((item) =>
    favorites.includes(item.idMeal),
  );

  return (
    <View style={globalStyles.container}>
      {/* HEADER */}
      <HeaderProfile />
      <View style={styles.body}>
        {/* LOADING */}
        {loading ? (
          <View style={globalStyles.centered}>
            <ActivityIndicator size="small" color={currentColors.primaryAction} />
            <Text style={[globalStyles.text, styles.spacedTop]}>
              Caricamento dei piatti in corso...
            </Text>
          </View>
        ) : /* ERROR */
        err ? (
          <View style={globalStyles.centered}>
            <Pressable onPress={meals}>
              <Ionicons name="refresh" size={24} color={currentColors.primaryAction} />
            </Pressable>
            <Text style={[globalStyles.text, styles.spacedTop]}>{err}</Text>
          </View>
        ) : /* EMPTY STATE */
        favorites.length === 0 ? (
          <View style={globalStyles.centered}>
            <Text style={globalStyles.text}>
              Non hai ancora aggiunto preferiti
            </Text>
          </View>
        ) : (
          /* LISTA */
          <View style={[styles.body, styles.listWrapper]}>
            <FlatList
              style={styles.flatList}
              data={filteredMeals}
              keyExtractor={(item) => item.idMeal}
              renderItem={({ item }) => (
                <MealCard
                  onPress={() =>
                    navigation.navigate("Details", {
                      idMeal: item.idMeal,
                    })
                  }
                  idMeal={item.idMeal}
                  strMeal={item.strMeal}
                  strMealThumb={item.strMealThumb}
                />
              )}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  spacedTop: {
    marginTop: 10,
  },
  listWrapper: {
    marginTop: 10,
    paddingBottom: 87,
  },
  flatList: {
    flex: 1,
  },
});
