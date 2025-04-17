import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("taskDatabase.db");

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  horario: string;
  localizacao: string;
  status: string;
};

export default function TaskCard({
  tarefa: task,
  onUpdate,
}: {
  tarefa: Tarefa;
  onUpdate: () => void;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [titulo, setTitulo] = useState(task.titulo);
  const [descricao, setDescricao] = useState(task.descricao);
  const [horario, setHorario] = useState(task.horario);
  const [localizacao, setLocalizacao] = useState(task.localizacao);

  const escapeString = (value: string) => {
    return `'${value.replace(/'/g, "''")}'`;
  };

  const handleEditTask = () => {
    try {
      const query = `
        UPDATE tarefas
        SET
          titulo = ${escapeString(titulo)},
          descricao = ${escapeString(descricao)},
          horario = ${escapeString(horario)},
          localizacao = ${escapeString(localizacao)}
        WHERE id = ${task.id};
      `;

      db.execSync(query);

      console.log("Tarefa atualizada com sucesso!");
      setShowEditModal(false);
      Alert.alert("Sucesso", "Tarefa atualizada com sucesso!");
      onUpdate();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  const handleDeleteTask = () => {
    try {
      const query = `
        DELETE FROM tarefas
        WHERE id = ${task.id};
      `;

      db.execSync(query);

      console.log("Tarefa excluída com sucesso!");
      setShowDeleteModal(false);
      Alert.alert("Sucesso", "Tarefa excluída com sucesso!");
      onUpdate();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    }
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.swipeRight}
      onPress={() => setShowDeleteModal(true)}
    >
      <Ionicons name="trash-outline" size={28} color="#fff" />
    </TouchableOpacity>
  );

  const renderLeftActions = () => (
    <TouchableOpacity
      style={styles.swipeLeft}
      onPress={() => setShowEditModal(true)}
    >
      <Ionicons name="create-outline" size={28} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <>
      {!showEditModal && !showDeleteModal && (
        <Swipeable
          onSwipeableLeftOpen={() => setShowEditModal(true)}
          onSwipeableRightOpen={() => setShowDeleteModal(true)}
          renderLeftActions={() => (
            <View style={styles.swipeLeft}>
              <Ionicons name="create-outline" size={28} color="#fff" />
            </View>
          )}
          renderRightActions={() => (
            <View style={styles.swipeRight}>
              <Ionicons name="trash-outline" size={28} color="#fff" />
            </View>
          )}
        >
          <View style={styles.card}>
            <View style={styles.taskInfo}>
              <Text style={styles.cardText}>
                {task.titulo.slice(0, 2).toUpperCase()}
              </Text>
              <View style={styles.taskTextContainer}>
                <Text style={{ fontWeight: "bold" }}>{task.titulo}</Text>
                <Text>
                  {task.horario} - {task.localizacao}
                </Text>
                <Text>{task.descricao}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => console.log("Marcar como concluída", task.id)}
              >
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Swipeable>
      )}

      <Modal transparent={true} visible={showDeleteModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
              Deseja excluir a tarefa "{task.titulo}"?
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={handleDeleteTask}
                style={styles.modalButtonDelete}
              >
                <Text style={{ color: "#fff" }}>Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                style={styles.modalButtonCancel}
              >
                <Text style={{ color: "#333" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Tarefa</Text>

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
              onPress={handleEditTask}
            >
              <Text style={styles.createButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
