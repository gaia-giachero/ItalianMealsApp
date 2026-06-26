import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AuthProvider from "./src/context/AuthContext";
import FavoritesProvider from "./src/context/FavoritesContext";

import AppNavigator from "./src/navigation/AppNavigator";

import { globalStyles } from "./src/theme/style";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.container}>
        <AuthProvider>
          <FavoritesProvider>
            <AppNavigator />
          </FavoritesProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
