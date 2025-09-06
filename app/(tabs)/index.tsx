import useTheme from "@/hooks/useTheme";

// convex
import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { SafeAreaView } from "react-native-safe-area-context";

// Linear gradient
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);

  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const toggleTodoHandler = async (id: Id<"todos">) => {
      try {
        await toggleTodo({ id: id });
      } catch (e) {
        console.error("Failed to toggle todo:", e);
        Alert.alert("Error", "Could not toggle todo. Please try again.");
      }
    };

    const deleteTodoHandler = async (id: Id<"todos">) => {
      try {
        Alert.alert(
          "Delete Todo",
          "Are you sure you want to delete this todo?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                await deleteTodo({ id });
              },
            },
          ]
        );
      } catch (error) {
        console.error("Failed to delete todo:", error);
        Alert.alert("Error", "Could not delete todo. Please try again.");
      }
    };

    return (
      <View style={homeStyle.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyle.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyle.checkbox}
            activeOpacity={0.7}
            onPress={() => toggleTodoHandler(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyle.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyle.todoTextContainer}>
            <Text
              style={[
                homeStyle.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.7,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={homeStyle.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="pencil" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTodoHandler(item._id)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="trash" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const tasks = useQuery(api.todos.getTodos);

  const styles = createHomeStyles(colors);

  const isLoading = tasks === undefined;

  if (isLoading) return <LoadingSpinner />;

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.container}>
        <Header />
        <TodoInput />
        <FlatList
          data={tasks}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyle.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={homeStyle.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
