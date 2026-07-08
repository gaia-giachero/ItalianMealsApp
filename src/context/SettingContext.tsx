import React, { createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppColors, colors, themes } from "../theme/colors";

interface SettingContextType {
  currentColors: AppColors;
  isDark: boolean;
  toggleTheme: () => void;
  //   notificationsEnabled: boolean;
  //   toggleNotifications: () => void;
}

export const SettingContext = createContext<SettingContextType>({
  currentColors: colors,
  isDark: false,
  toggleTheme: () => {},
  //   notificationsEnabled: false,
  //   toggleNotifications: () => {},
});

export default function SettingProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = React.useState<boolean>(false);
  const currentColors = isDark ? themes.dark : themes.light;

  function toggleTheme() {
    setIsDark(!isDark);
  }

  const isLoaded = React.useRef(false);
  async function loadTheme() {
    try {
      const theme = await AsyncStorage.getItem("app:v1:theme");
      if (theme !== null) {
        setIsDark(JSON.parse(theme));
      }
    } catch (_) {}
    isLoaded.current = true;
  }
  React.useEffect(() => {
    loadTheme();
  }, []);
  async function saveTheme() {
    if (!isLoaded.current) return;
    try {
      await AsyncStorage.setItem("app:v1:theme", JSON.stringify(isDark));
    } catch (_) {}
  }
  React.useEffect(() => {
    saveTheme();
  }, [isDark]);

  return (
    <SettingContext.Provider value={{ isDark, toggleTheme, currentColors }}>
      {children}
    </SettingContext.Provider>
  );
}
