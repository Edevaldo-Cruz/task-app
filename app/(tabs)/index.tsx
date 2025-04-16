import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/Themed";
import EditScreenInfo from "@/components/EditScreenInfo";

export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [horario, setHorario] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const handleCreateTask = () => {
    console.log({ titulo, descricao, horario, localizacao });
    setModalVisible(false);
  };

  return (
    <View style={styles.Content}>
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Nova tarefa</Text>
          <TouchableOpacity
            style={styles.botaoNovaTarefa}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <EditScreenInfo path="app/(tabs)/index.tsx" />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Criar Nova Tarefa</Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
            />
            <TextInput
              style={styles.input}
              placeholder="Horário"
              value={horario}
              onChangeText={setHorario}
            />
            <TextInput
              style={styles.input}
              placeholder="Localização"
              value={localizacao}
              onChangeText={setLocalizacao}
            />

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateTask}
            >
              <Text style={styles.createButtonText}>Criar Tarefa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Content: {
    height: "100%",
    backgroundColor: "#fff",
  },
  container: {
    height: "20%",
    backgroundColor: "#fd5ba9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fd5ba9",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  botaoNovaTarefa: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b03f75",
    padding: 4,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },

  // Estilos da Modal
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5, 
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
