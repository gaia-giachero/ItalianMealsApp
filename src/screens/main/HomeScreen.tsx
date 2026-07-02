import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { fetchItalianMeals } from "../../services/meals";

import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import MealCard from "../../components/MealCard";
import SearchBar from "../../components/SearchBar";

import { globalStyles } from "../../theme/style";
import { colors } from "../../theme/colors";
import HeaderProfile from "../../components/HeaderProfile";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation }: any) {
  // LOADING OF MEALS
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

  // SEARCH AND FILTER
  const [search, setSearch] = React.useState<string>("");

  const filteredMeals = mealsItems.filter((item) =>
    item.strMeal.toLowerCase().includes(search.toLowerCase()),
  );

  // REFRESHING FLATLIST
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  async function handleRefresh() {
    setIsRefreshing(true);
    await meals(); // Riesegue la chiamata API reale e aggiorna lo stato dei piatti
    setIsRefreshing(false);
  }

  return (
    <View style={globalStyles.container}>
      <HeaderProfile />
      <View style={styles.body}>
        {loading ? (
          <View style={globalStyles.centered}>
            <ActivityIndicator size="small" color={colors.primaryAction} />
            <Text style={[globalStyles.text, styles.spacedTop]}>
              Caricamento dei piatti in corso...
            </Text>
          </View>
        ) : err ? (
          <View style={globalStyles.centered}>
            <Pressable onPress={meals}>
              <Ionicons name="refresh" size={24} color={colors.primaryAction} />
            </Pressable>
            <Text style={[globalStyles.text, styles.spacedTop]}>
              Riprova ricaricando la pagina
            </Text>
          </View>
        ) : (
          <View style={[styles.body, styles.listWrapper]}>
            <SearchBar onChangeSearch={setSearch} textSearch={search} />
            <FlatList
              style={styles.flatList}
              data={filteredMeals}
              keyExtractor={(item) => item.idMeal}
              renderItem={({ item }) => {
                return (
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
                );
              }}
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
  headerTitle: {
    flex: 1,
  },
  spacedTop: {
    marginTop: 10,
  },
  listWrapper: {
    paddingBottom: 87, // altezza barra (67) + respiro (20)
  },
  flatList: {
    flex: 1,
  },
});
