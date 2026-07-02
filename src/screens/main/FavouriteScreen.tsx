import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { globalStyles } from "../../theme/style";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { FavoritesContext } from "../../context/FavoritesContext";
import { fetchItalianMeals } from "../../services/meals";
import MealCard from "../../components/MealCard";
import { AuthContext } from "../../context/AuthContext";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function FavouriteScreen({ navigation }: any) {
  const { name, avatarUri, logout } = useContext(AuthContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

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

  // ✅ FILTRO CORRETTO
  const filteredMeals = mealsItems.filter((item) =>
    favorites.includes(item.idMeal),
  );

  return (
    <View style={globalStyles.container}>
      {/* HEADER */}
      <View style={globalStyles.header}>
        <View style={styles.avatarName}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          </View>
          <Text style={styles.nomeCognome}>{name}</Text>
        </View>
        <Pressable onPress={logout}>
          <Ionicons name="log-out-outline" size={25} color="black" />
        </Pressable>
      </View>

      <View style={styles.body}>
        {/* LOADING */}
        {loading ? (
          <View style={globalStyles.centered}>
            <ActivityIndicator size="small" color={colors.primaryAction} />
            <Text style={[globalStyles.text, styles.spacedTop]}>
              Caricamento dei piatti in corso...
            </Text>
          </View>
        ) : /* ERROR */
        err ? (
          <View style={globalStyles.centered}>
            <Pressable onPress={meals}>
              <Ionicons name="refresh" size={24} color={colors.primaryAction} />
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
                      id: item.idMeal,
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
  avatarName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nomeCognome: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.9,
    color: "#000",
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: colors.placeholder,
  },
  avatar: {
    width: 52,
    height: 52,
  },
  listWrapper: {
    marginTop: 10,
    paddingBottom: 87,
  },
  flatList: {
    flex: 1,
  },
});
