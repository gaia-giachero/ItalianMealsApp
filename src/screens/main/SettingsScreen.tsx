import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Switch, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getGlobalStyles } from "../../theme/style";
import { SettingContext } from "../../context/SettingContext";
import { AuthContext } from "../../context/AuthContext";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function SettingScreen() {
  const { name, avatarUri, logout } = useContext(AuthContext);
  const { isDark, toggleTheme, currentColors } = useContext(SettingContext);
  const { favorites } = useContext(FavoritesContext);
  const globalStyles = getGlobalStyles(currentColors);

  const [notification, setNotification] = React.useState<boolean>(false);

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.primary }]}
    >
      {/* Avatar + Name */}
      <View style={styles.profileSection}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <Text style={[globalStyles.title, { color: currentColors.black }]}>
          {name}
        </Text>

        {/* Favorites badge */}
        <View
          style={[
            styles.favoritesBadge,
            { backgroundColor: currentColors.placeholder + "33" },
          ]}
        >
          <Ionicons name="heart" size={16} color={currentColors.error} />
          <Text style={[styles.favoritesCount, { color: currentColors.black }]}>
            {favorites.length}
          </Text>
        </View>
      </View>

      {/* Settings card */}
      <View
        style={[
          styles.card,
          { backgroundColor: currentColors.placeholder + "22" },
        ]}
      >
        {/* Toggle rows */}
        <View style={styles.row}>
          <Ionicons name="moon" size={18} color={currentColors.black} />
          <Text style={[styles.rowLabel, { color: currentColors.black }]}>
            Dark Mode
          </Text>
          <Switch
            onValueChange={toggleTheme}
            value={isDark}
            trackColor={{
              false: currentColors.placeholder,
              true: currentColors.primaryAction,
            }}
            thumbColor="#fff"
            style={styles.switch}
          />
        </View>

        <View style={styles.row}>
          <Ionicons
            name="notifications"
            size={18}
            color={currentColors.black}
          />
          <Text style={[styles.rowLabel, { color: currentColors.black }]}>
            Notifications
          </Text>
          <Switch
            onValueChange={setNotification}
            value={notification}
            trackColor={{
              false: currentColors.placeholder,
              true: currentColors.primaryAction,
            }}
            thumbColor="#fff"
            style={styles.switch}
          />
        </View>

        {/* Divider */}
        <View
          style={[
            styles.divider,
            { backgroundColor: currentColors.placeholder },
          ]}
        />

        {/* Navigation rows */}
        <Pressable style={styles.row}>
          <Ionicons name="lock-closed" size={18} color={currentColors.black} />
          <Text style={[styles.rowLabel, { color: currentColors.black }]}>
            Privacy
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={currentColors.placeholder}
            style={styles.chevron}
          />
        </Pressable>

        <Pressable style={styles.row}>
          <Ionicons name="shield" size={18} color={currentColors.black} />
          <Text style={[styles.rowLabel, { color: currentColors.black }]}>
            Security
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={currentColors.placeholder}
            style={styles.chevron}
          />
        </Pressable>

        <Pressable style={styles.row}>
          <Ionicons
            name="person-circle"
            size={18}
            color={currentColors.black}
          />
          <Text style={[styles.rowLabel, { color: currentColors.black }]}>
            Account
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={currentColors.placeholder}
            style={styles.chevron}
          />
        </Pressable>

        {/* Logout */}
        <Pressable style={styles.row} onPress={logout}>
          <Ionicons
            name="log-out-outline"
            size={18}
            color={currentColors.black}
          />
          <Text style={[styles.rowLabel, { color: currentColors.black }]}>
            Esci dall'account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  screenLabel: {
    fontSize: 13,
    marginTop: 50,
    marginBottom: 20,
  },

  /* Profile section */
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: 10,
    backgroundColor: "#E0D7F5",
  },
  favoritesBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 5,
    marginTop: 10,
  },
  favoritesCount: {
    fontSize: 16,
    fontWeight: "500",
  },

  /* Settings card */
  card: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 10,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  switch: {
    marginLeft: "auto",
  },
  chevron: {
    marginLeft: "auto",
  },

  divider: {
    height: 1,
    marginVertical: 2,
  },

  /* Bottom nav */
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#DDE3F0",
    borderRadius: 30,
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    padding: 4,
  },
});
