import useTheme from "@/hooks/useTheme";

// convex

import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SafeAreaView } from "react-native-safe-area-context";

// Linear gradient
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

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
      <SafeAreaView style={styles.container}>
        <Text>hi</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
