import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

import { colorsTasks, styles } from "./styles";
import EditTaskModal from "../EditTask";
import * as Notifications from "expo-notifications";

const db = SQLite.openDatabaseSync("taskDatabase.db");

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  horario: string;
  data: string;
  status: string;
};

export default function TaskCard({
  tarefa: task,
  onUpdate,
  inProgress,
  finished,
  index,
}: {
  tarefa: Tarefa;
  onUpdate: () => void;
  inProgress?: boolean;
  finished?: boolean;
  index: number;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [titulo, setTitulo] = useState(task.titulo);
  const [descricao, setDescricao] = useState(task.descricao);
  const [horario, setHorario] = useState(task.horario);
  const [data, setData] = useState(task.data);

  const escapeString = (value: string) => {
    return `'${value.replace(/'/g, "''")}'`;
  };

  const formatarDataBrasileira = (dateString: string) => {
    if (!dateString) return "Selecione uma data";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const handleEditTask = () => {
    try {
      const query = `
        UPDATE tarefas
        SET
          titulo = ${escapeString(titulo)},
          descricao = ${escapeString(descricao)},
          horario = ${escapeString(horario)},
          data = ${escapeString(data)}
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

  const handleDeleteTask = async () => {
    try {
      const result = db.getFirstSync<{ notification_id: string }>(`
        SELECT notification_id FROM tarefas WHERE id = ${task.id};
      `);

      const notificationId = result?.notification_id;

      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        console.log(`Notificação ${notificationId} cancelada com sucesso.`);
      }

      const deleteQuery = `
        DELETE FROM tarefas
        WHERE id = ${task.id};
      `;

      db.execSync(deleteQuery);

      console.log("Tarefa excluída com sucesso!");
      setShowDeleteModal(false);
      Alert.alert("Sucesso", "Tarefa excluída com sucesso!");
      onUpdate();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    }
  };

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    try {
      const query = `UPDATE tarefas SET status = '${newStatus}' WHERE id = ${taskId}`;
      db.execSync(query);

      console.log(`Status da tarefa ${taskId} atualizado para ${newStatus}`);
      onUpdate();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status da tarefa");
    }
  };

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
              <Text
                style={[
                  styles.cardText,
                  { backgroundColor: colorsTasks[index % colorsTasks.length] },
                ]}
              >
                {task.titulo.slice(0, 2).toUpperCase()}
              </Text>
              <View style={styles.taskTextContainer}>
                <Text style={{ fontWeight: "bold" }}>{task.titulo}</Text>
                <Text>
                  {task.horario} - {formatarDataBrasileira(task.data)}
                </Text>
                <Text>{task.descricao}</Text>
              </View>
              {!finished ? (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    updateTaskStatus(
                      task.id,
                      inProgress ? "finalizada" : "iniciada"
                    )
                  }
                >
                  {inProgress ? (
                    <Ionicons name="checkmark-circle" size={24} color="#fff" />
                  ) : (
                    <Ionicons name="play-circle" size={24} color="#fff" />
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Concluido</Text>
                </View>
              )}
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

      <EditTaskModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditTask}
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
        data={formatarDataBrasileira(data)}
        setData={() => {}}
        horario={horario}
        setHorario={setHorario}
        openDatePicker={false}
        setOpenDatePicker={() => {}}
        openTimePicker={false}
        setOpenTimePicker={() => {}}
        formatarDataBrasileira={(data) => data}
        formatarHora={(time) => time}
      />
    </>
  );
}
