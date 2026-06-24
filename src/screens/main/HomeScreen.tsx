import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { fetchItalianMeals } from "../../services/meals";

import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";

import MealCard from "../../components/MealCard";
import SearchBar from "../../components/SearchBar";

import { globalStyles } from "../../theme/style";
import { colors } from "../../theme/colors";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function HomeScreen({ navigation, route }: any) {
  const name = route.params?.name;
  const avatar = route.params?.avatar;

  // LOADING OF MEALS
  const [mealsItems, setMealsItems] = React.useState<Meal[]>([]);
  const [err, setErr] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const isLoaded = React.useRef(false);

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

  // LOGOUT ACCOUNT
  function logout() {
    console.log("LOGOUT");
  }

  // FAVORITES
  const [favorites, setFavorites] = React.useState<string[]>([]);

  function toggleFavorite(idMeal: string) {
    if (favorites.includes(idMeal)) {
      setFavorites(favorites.filter((id) => id !== idMeal));
    } else {
      setFavorites([...favorites, idMeal]);
    }
  }

  async function loadFavorites() {
    try {
      const favorites = await AsyncStorage.getItem("app:v1:favs");
      if (favorites !== null) {
        setFavorites(JSON.parse(favorites));
      }
    } catch (_) {}
    isLoaded.current = true;
  }

  React.useEffect(() => {
    loadFavorites();
  }, []);

  async function saveFavorites() {
    if (!isLoaded.current) return;
    try {
      await AsyncStorage.setItem("app:v1:favs", JSON.stringify(favorites));
    } catch (_) {}
  }

  React.useEffect(() => {
    saveFavorites();
  }, [favorites]);

  // SEARCH AND FILTER
  const [search, setSearch] = React.useState<string>("");

  const filteredMeals = mealsItems.filter((item) =>
    item.strMeal.toLowerCase().includes(search.toLowerCase()),
  );

  function cancelField(){
    setSearch("");
  }

  // REFRESHING FLATLIST
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  async function handleRefresh() {
    setIsRefreshing(true);
    await meals(); // Riesegue la chiamata API reale e aggiorna lo stato dei piatti
    setIsRefreshing(false);
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <Text style={[globalStyles.title, styles.headerTitle]}>{name}</Text>
        <Pressable onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color={colors.gray500} />
        </Pressable>
      </View>
      <View style={styles.body}>
        {loading ? (
          <View style={globalStyles.centered}>
            <ActivityIndicator size="small" color={colors.primaryAction} />
            <Text style={[globalStyles.text, styles.spacedTop]}>Caricamento dei piatti in corso...</Text>
          </View>
        ) : err ? (
          <View style={globalStyles.centered}>
            <Pressable onPress={meals}>
              <Ionicons name="refresh" size={24} color={colors.primaryAction} />
            </Pressable>
            <Text style={[globalStyles.text, styles.spacedTop]}>Riprova ricaricando la pagina</Text>
          </View>
        ) : (
          <View style={styles.body}>
            <SearchBar onChangeSearch={setSearch} textSearch={search} />
            <FlatList
              data={filteredMeals}
              keyExtractor={(item) => item.idMeal}
              renderItem={({ item }) => {
                return (
                  <MealCard
                    onPress={() =>
                      navigation.navigate("Details", {
                        id: item.idMeal,
                      })
                    }
                    strMeal={item.strMeal}
                    strMealThumb={item.strMealThumb}
                    isFavorite={favorites.includes(item.idMeal)}
                    onToggleFavorite={() => toggleFavorite(item.idMeal)}
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
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: colors.gray500,
  },
  avatar: {
    width: 50,
    height: 50,
  },
});