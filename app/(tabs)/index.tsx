import useTheme from "@/hooks/useTheme";

// convex

import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SafeAreaView } from "react-native-safe-area-context";

// Linear gradient
import Header from "@/components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";

export default function Index() {
  const { colors } = useTheme();

  const tasks = useQuery(api.todos.getTodos);
  console.log(tasks);

  const styles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.container}>
        <Header />
      </SafeAreaView>
    </LinearGradient>
  );
}
