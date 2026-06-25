import { TextInput, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../theme/style";
import { colors } from "../theme/colors";

interface search {
  textSearch: string;
  onChangeSearch: (text: string) => void;
}

export default function SearchBar({ textSearch, onChangeSearch }: search) {
  return (
    <View style={styles.wrapper}>
      <Ionicons name="search" size={18} color={colors.placeholder} style={styles.iconLeft} />
      <TextInput
        style={[globalStyles.search, styles.input]}
        onChangeText={onChangeSearch}
        value={textSearch}
        placeholder="Cerca un piatto..."
        placeholderTextColor={colors.placeholder}
      />
      {textSearch.length > 0 && (
        <Pressable
          style={styles.iconRight}
          onPress={() => onChangeSearch("")}
          hitSlop={8}
        >
          <Ionicons name="close-circle" size={18} color={colors.placeholder} />
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