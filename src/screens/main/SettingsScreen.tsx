import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../theme/style";
import { colors } from "../../theme/colors";
import { AuthContext } from "../../context/AuthContext";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function SettingScreen() {
  const { name, avatarUri, logout } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);

  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  const [notification, setNotification] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* Avatar + Name */}
      <View style={styles.profileSection}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <Text style={[globalStyles.title, {color: colors.black}]}>{name}</Text>

        {/* Favorites badge */}
        <View style={styles.favoritesBadge}>
          <Ionicons name="heart" size={16} color={colors.error} />
          <Text style={styles.favoritesCount}>{favorites.length}</Text>
        </View>
      </View>

      {/* Settings card */}
      <View style={styles.card}>
        {/* Toggle rows */}
        <View style={styles.row}>
          <Ionicons name="moon" size={18} color="#222" />
          <Text style={styles.rowLabel}>Dark Mode</Text>
          <Switch
            onValueChange={setDarkMode}
            value={darkMode}
            trackColor={{ false: "#ccc", true: "#6C63FF" }}
            thumbColor="#fff"
            style={styles.switch}
          />
        </View>

        <View style={styles.row}>
          <Ionicons name="notifications" size={18} color="#222" />
          <Text style={styles.rowLabel}>Notifications</Text>
          <Switch
            onValueChange={setNotification}
            value={notification}
            trackColor={{ false: "#ccc", true: "#6C63FF" }}
            thumbColor="#fff"
            style={styles.switch}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Navigation rows */}
        <Pressable style={styles.row}>
          <Ionicons name="lock-closed" size={18} color="#222" />
          <Text style={styles.rowLabel}>Privacy</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </Pressable>

        <Pressable style={styles.row}>
          <Ionicons name="shield" size={18} color="#222" />
          <Text style={styles.rowLabel}>Security</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </Pressable>

        <Pressable style={styles.row}>
          <Ionicons name="person-circle" size={18} color="#222" />
          <Text style={styles.rowLabel}>Account</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </Pressable>

        {/* Logout */}
        <Pressable style={styles.row} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#222" />
          <Text style={styles.rowLabel}>Esci dall'account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  screenLabel: {
    fontSize: 13,
    color: "#555",
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
    backgroundColor: "#EFEFEF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 5,
    marginTop: 10,
  },
  favoritesCount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },

  /* Settings card */
  card: {
    backgroundColor: "#F2F2F2",
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
    color: "#111",
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
    backgroundColor: "#DCDCDC",
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