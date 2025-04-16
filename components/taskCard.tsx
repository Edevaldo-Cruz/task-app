import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function TaskCard() {
  const renderRightActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => console.log("Edit")}
      >
        <Ionicons name="create-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => console.log("Delete")}
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <View style={styles.taskInfo}>
          <Text style={styles.cardText}>TS</Text>
          <View style={styles.taskTextContainer}>
            <Text>Task test</Text>
            <Text>08:00</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log("End")}
          >
            <Ionicons name="checkmark-done-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 14,
  },
  cardText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#333",
    textAlignVertical: "center",
    marginRight: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
});
