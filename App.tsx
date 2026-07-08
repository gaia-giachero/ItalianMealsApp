import React, { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AuthProvider from "./src/context/AuthContext";
import FavoritesProvider from "./src/context/FavoritesContext";

import AppNavigator from "./src/navigation/AppNavigator";

import { getGlobalStyles } from "./src/theme/style";
import SettingProvider, { SettingContext } from "./src/context/SettingContext";

export default function App() {
  const { isDark, currentColors } = useContext(SettingContext);
  return (
    <SettingProvider>
      <SafeAreaProvider>
        <SafeAreaView style={getGlobalStyles.container}>
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
