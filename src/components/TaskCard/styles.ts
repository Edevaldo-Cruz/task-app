import { StyleSheet } from "react-native";

export const colorsTasks = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33A1", // Pink
  "#FF8C33", // Orange
  "#33FFF6", // Cyan
  "#FF33F6", // Magenta
];

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
    height: 90,
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
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  swipeRight: {
    backgroundColor: "#f44336",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  swipeLeft: {
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalButtonDelete: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  modalButtonEdit: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonCancel: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});
