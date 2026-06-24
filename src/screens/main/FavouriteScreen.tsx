import { Text, View } from "react-native";
import { globalStyles } from "../../theme/style";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

export default function FavouriteScreen() {
  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <MaterialIcons name="engineering" size={48} color={colors.warning} />
      <Text style={globalStyles.text}>
        Pagina da inizializzare, conterrà tutti i piatti preferiti
      </Text>
    </View>
  );
}
