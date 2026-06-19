import { Text, Pressable, View, StyleSheet } from "react-native";

export default function DetailsScreen({ route, navigation }: any) {
  const id = route.params?.id;
  const path = id ? `myapp://dettagli/${id}` : undefined;

  if (!id) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Invalid deep link</Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Torna alla Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.idText}>ID: {id}</Text>
        <Text>Path: {path}</Text>

      </View>

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Torna alla Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  idText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007aff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
  },
});