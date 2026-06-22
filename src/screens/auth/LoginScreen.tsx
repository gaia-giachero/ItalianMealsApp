import React from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { validateLogin } from "../../services/auth";
import EyeButton from "../../components/EyeButton";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  function handleLogin() {
    setError("");

    if (email === "" || password === "") {
      setError("Compila tutti i campi");
      return;
    }

    setIsLoading(true);
    const userFound = validateLogin(email, password);

    if (userFound) {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      navigation.navigate("MainTab", {
        screen: "Home", 
        params: {
          name: userFound.name,
          avatar: userFound.avatarUri,
        },
      });
    } else {
      setIsLoading(false);
      setError("Email o password non valide! Riprova!");
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={50}
      >
        <TextInput
          style={styles.row}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.row}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholder="Password"
          />
          <EyeButton
            state={isPasswordVisible}
            toggle={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeButton}
          />
        </View>
        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
        <Pressable
          style={styles.btn}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text>Login</Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  link: {
    marginTop: 8,
    fontSize: 12,
    color: "#007aff",
  },

  row: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 40,
    paddingLeft: 20,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff9d899",
    borderColor: "#ffd900",
    marginBottom: 10,
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 40,
    paddingLeft: 20,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#ffd900",
    backgroundColor: "#fff9d8",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});
