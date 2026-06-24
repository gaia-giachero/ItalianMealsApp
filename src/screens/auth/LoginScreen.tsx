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
import { colors } from "../../theme/colors";

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
    <View style={[globalStyles.container, globalStyles.centered]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={globalStyles.panel}
        keyboardVerticalOffset={50}
      >
        <Text style={[globalStyles.title, styles.spacing]}>Accedi</Text>
        <TextInput
          style={[globalStyles.input, styles.form]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.gray500}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={[styles.passwordRow, styles.form]}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholder="Password"
            placeholderTextColor={colors.gray500}
            style={[globalStyles.input, styles.passwordInput]}
          />
          <EyeButton
            state={isPasswordVisible}
            toggle={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeButton}
          />
        </View>
        {error !== "" && (
          <Text style={[globalStyles.errorText, styles.form]}>
            {error}
          </Text>
        )}
        <Pressable
          style={[globalStyles.btn, styles.form]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={globalStyles.btnText}>Login</Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  spacing: {
    marginBottom: 30,
  },
  passwordRow: {
    width: "100%",
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50, // spazio per l'EyeButton
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});
