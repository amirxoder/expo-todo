import useTheme from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const toggleThemeMode = () => {
    toggleDarkMode();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Hi there</Text>
      <Text style={styles.subContent}>first app with expo</Text>
      <TouchableOpacity onPress={() => toggleThemeMode()}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    gap: "122rem",
    justifyContent: "center",
    // flexDirection: "row",
    // rowGap: 2,
  },
  content: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  subContent: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});
