import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { globalStyles } from "./src/theme/style";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.container}>
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
