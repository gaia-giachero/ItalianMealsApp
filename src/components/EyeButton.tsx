import { Ionicons } from "@expo/vector-icons";
import { Pressable, ViewStyle } from "react-native";
import { SettingContext } from "../context/SettingContext";
import { useContext } from "react";

interface EyeButtonProps {
  state: boolean;
  toggle: () => void;
  style?: ViewStyle;
}

export default function EyeButton({ state, toggle, style }: EyeButtonProps) {
  const { currentColors } = useContext(SettingContext);
  return (
    <Pressable
      onPress={toggle}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={state ? "Nascondi password" : "Mostra password"}
    >
      {state ? (
        <Ionicons name="eye" size={24} color={currentColors.placeholder} />
      ) : (
        <Ionicons name="eye-off" size={24} color={currentColors.placeholder} />
      )}
    </Pressable>
  );
}
