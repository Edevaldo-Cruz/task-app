import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  inputContainer: {
    marginBottom: 15,
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
    color: "#555",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  datetimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  halfWidth: {
    width: "48%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  createButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },

  createButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  closeButton: {
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },

  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
