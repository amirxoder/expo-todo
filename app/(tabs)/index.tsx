import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Hi there</Text>
      <Text style={styles.subContent}>first app with expo</Text>
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
    justifyContent: "center",
    flexDirection: "row",
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
