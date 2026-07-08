import React, { useContext } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getGlobalStyles } from "../theme/style";
import { SettingContext } from "../context/SettingContext";

interface search {
  textSearch: string;
  onChangeSearch: (text: string) => void;
}

export default function SearchBar({ textSearch, onChangeSearch }: search) {
  const { currentColors } = useContext(SettingContext);
  const globalStyles = getGlobalStyles(currentColors);

  return (
    <View style={styles.wrapper}>
      <Ionicons
        name="search"
        size={18}
        color={currentColors.placeholder}
        style={styles.iconLeft}
      />
      <TextInput
        style={[globalStyles.search, styles.input]}
        onChangeText={onChangeSearch}
        value={textSearch}
        placeholder="Cerca un piatto..."
        placeholderTextColor={currentColors.placeholder}
        accessibilityLabel="Cerca un piatto"
      />
      {textSearch.length > 0 && (
        <Pressable
          style={styles.iconRight}
          onPress={() => onChangeSearch("")}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Cancella ricerca"
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={currentColors.placeholder}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15,
    marginTop: 10,
    position: "relative",
  },
  input: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  iconLeft: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: [{ translateY: -14 }],
    zIndex: 1,
  },
  iconRight: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: [{ translateY: -14 }],
    zIndex: 1,
  },
});
