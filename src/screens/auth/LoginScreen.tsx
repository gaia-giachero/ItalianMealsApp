import React, { useContext } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { validateLogin } from "../../services/auth";
import EyeButton from "../../components/EyeButton";
import { AuthContext } from "../../context/AuthContext";

import { getGlobalStyles } from "../../theme/style";
import { SettingContext } from "../../context/SettingContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const { currentColors } = useContext(SettingContext);
  const globalStyles = getGlobalStyles(currentColors);

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
      login(email, password);
    } else {
      setIsLoading(false);
      setError("Email o password non valide! Riprova!");
    }
  }

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.panel}>
          <Text style={[globalStyles.title, styles.spacing]}>Accedi</Text>
          <TextInput
            style={[globalStyles.input, styles.form]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={currentColors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={[styles.passwordRow, styles.form]}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholder="Password"
              placeholderTextColor={currentColors.placeholder}
              style={[globalStyles.input, styles.passwordInput]}
            />
            <EyeButton
              state={isPasswordVisible}
              toggle={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeButton}
            />
          </View>
          {error !== "" && (
            <Text style={[globalStyles.errorText, styles.form]}>{error}</Text>
          )}
          <Pressable
            style={[
              globalStyles.btn,
              styles.form,
              isLoading && styles.btnDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={globalStyles.btnText}>Login</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
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
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -16 }],
  },
  btnDisabled: {
    opacity: 0.6,
  },
});