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

import { globalStyles } from "../../theme/style";

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
    <View style={globalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bkgForm}
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
        {error !== "" && <Text style={globalStyles.errorText}>{error}</Text>}
        <Pressable
          style={globalStyles.btn}
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
  bkgForm: {
    flex: 1,
    backgroundColor: "#ff0000",
    padding: 15,
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
  eyeButton: {
    position: "absolute",
    right: 10,
    top: "50%"
  },
});
