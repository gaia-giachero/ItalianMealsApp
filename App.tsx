import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AuthProvider from "./src/context/AuthContext";
import FavoritesProvider from "./src/context/FavoritesContext";

import AppNavigator from "./src/navigation/AppNavigator";

import { globalStyles } from "./src/theme/style";
import SettingProvider from "./src/context/SettingContext";

export default function App() {
  return (
    <SettingProvider>
      <SafeAreaProvider>
        <SafeAreaView style={globalStyles.container}>
          <AuthProvider>
            <FavoritesProvider>
              <AppNavigator />
            </FavoritesProvider>
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </SettingProvider>
  );
}
