import React, { createContext, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteContextType {
  favorites: string[];
  toggleFavorite: (idMeal: string) => void;
}

export const FavoritesContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export default function FavoritesProvider({ children }: { children: ReactNode }) {
  const isLoaded = React.useRef(false);
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

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
