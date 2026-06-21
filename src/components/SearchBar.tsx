import { TextInput, View } from "react-native";

interface search {
  textSearch: string;
  onChangeSearch: (text: string) => void;
}

export default function SearchBar({ textSearch, onChangeSearch }: search) {
  return (
    <View>
      <TextInput onChangeText={onChangeSearch} value={textSearch} />
    </View>
  );
}
