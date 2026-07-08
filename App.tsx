import React, { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import AuthProvider from "./src/context/AuthContext";
import FavoritesProvider from "./src/context/FavoritesContext";

import AppNavigator from "./src/navigation/AppNavigator";

import SettingProvider, { SettingContext } from "./src/context/SettingContext";

// App() crea il Provider ma non può leggerla nello stesso momento in cui la sta creando.
// AppContent() viene montato dopo come figlio del Provider: 
// solo da qui useContext(SettingContext) restituisce i valori veri
 
function AppContent() {
  const { isDark, currentColors } = useContext(SettingContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentColors.primary }}>
      <StatusBar style={ isDark ? 'light' : 'dark'} />
      <AuthProvider>
        <FavoritesProvider>
          <AppNavigator />
        </FavoritesProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

export default function App(){
  return (
    <SettingProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </SettingProvider>
  );
}
