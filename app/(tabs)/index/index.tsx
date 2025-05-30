import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  View,
  Alert,
  Task,
  Text,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as Notifications from "expo-notifications";
import { useFocusEffect, usePathname } from "expo-router";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { registerTranslation } from "react-native-paper-dates";
import * as TaskManager from "expo-task-manager";

import { styles } from "./styles";
import { Tarefas, TaskContainer } from "@/components/TaskContainer";
import { scheduleTaskNotification } from "@/Notification/scheduleTaskNotification";

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  horario: string;
  notification_id: string;
  status: string;
}
const db = SQLite.openDatabaseSync("taskDatabase.db");

registerTranslation("pt", {
  save: "Salvar",
  selectSingle: "Selecionar data",
  selectMultiple: "Selecionar datas",
  selectRange: "Selecionar período",
  notAccordingToDateFormat: (inputFormat) =>
    `Formato de data deve ser ${inputFormat}`,
  mustBeHigherThan: (date) => `Deve ser depois de ${date}`,
  mustBeLowerThan: (date) => `Deve ser antes de ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Deve estar entre ${startDate} - ${endDate}`,
  dateIsDisabled: "Data não permitida",
  previous: "Anterior",
  next: "Próximo",
  typeInDate: "Digitar data",
  pickDateFromCalendar: "Selecionar data do calendário",
  close: "Fechar",
  hour: "Hora",
  minute: "Minuto",
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const getTasksToNotify = async () => {
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  try {
    const query = `
      SELECT * FROM tarefas 
      WHERE status = 'pendente' 
      AND data = ? 
      AND horario <= ?
    `;

    return db.getAllSync<Tarefas[]>(query, [currentDate, currentTime]);
  } catch (error) {
    console.error("Erro ao buscar tarefas para notificação:", error);
    return [];
  }
};

TaskManager.defineTask("TASK_NOTIFICATION", async ({ data, error }) => {
  if (error) {
    console.error("Error in background task:", error);
    return;
  }

  const tasks = await getTasksToNotify();
  tasks.forEach((task: any) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Lembrete: ${task.titulo}`,
        body: task.descricao || "Hora de realizar esta tarefa!",
        sound: true,
      },
      trigger: null,
    });
  });
});

export default function Index() {
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [horario, setHorario] = useState("");
  const [data, setData] = useState("");
  const pathname = usePathname();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const formatarDataBrasileira = (dateString: string) => {
    if (!dateString) return "Selecione a data";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatarHora = (timeString: string) => {
    if (!timeString) return "Selecione a hora";
    return timeString;
  };

  const loadTasks = () => {
    try {
      const query = "SELECT * FROM tarefas WHERE status = 'pendente'";

      const result = db.getAllSync<Tarefas>(query);
      setTarefas(result);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const escapeString = (value: string) => {
    return `'${value.replace(/'/g, "''")}'`;
  };

  const resetForm = () => {
    setTitulo("");
    setDescricao("");
    setHorario("");
    setData("");
  };

  const handleCreateTask = async () => {
    if (!titulo || !data || !horario) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const agora = new Date();
    const dataAtual = agora.toISOString().split("T")[0];
    const [horaSelecionada, minutoSelecionado] = horario.split(":").map(Number);

    if (
      data < dataAtual ||
      (data === dataAtual &&
        (horaSelecionada < agora.getHours() ||
          (horaSelecionada === agora.getHours() &&
            minutoSelecionado < agora.getMinutes())))
    ) {
      Alert.alert("Erro", "Selecione uma data e horário futuros.");
      return;
    }

    try {
      const query = `
        INSERT INTO tarefas (titulo, descricao, horario, data, status)
        VALUES (
          ${escapeString(titulo)},
          ${escapeString(descricao)},
          ${escapeString(horario)},
          ${escapeString(data)},
          'pendente'
        );
      `;

      db.execSync(query);

      const result = db.getAllSync<{ id: number }>(
        "SELECT last_insert_rowid() as id"
      );
      const taskId = result[0].id;

      const notificationId = await scheduleTaskNotification({
        id: taskId,
        titulo,
        descricao,
        data,
        horario,
        notification_id: "",
        status: "pendente",
      });

      const updateQuery = `
        UPDATE tarefas
        SET notification_id = ${escapeString(notificationId)}
        WHERE id = ${taskId};
      `;
      db.execSync(updateQuery);

      loadTasks();
      setModalVisible(false);
      resetForm();
      Alert.alert("Sucesso", "Tarefa criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      Alert.alert("Erro", "Houve um problema ao criar a tarefa.");
    }
  };

  const initializeDB = () => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        descricao TEXT,
         data TEXT,
        horario TEXT,
        notification_id TEXT,     
        status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'iniciada', 'finalizada', 'cancelada'))
      );
    `);
  };

  useEffect(() => {
    initializeDB();
    loadTasks();

    const notificationReceivedListener =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notificação recebida:", notification);
      });

    const notificationResponseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        
      });

    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "As notificações não funcionarão sem permissão"
        );
      }

      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    };

    requestPermissions();

    const registerBackgroundTask = async () => {
      try {
        await Notifications.registerTaskAsync("TASK_NOTIFICATION");
      } catch (error) {
        console.error("Erro ao registrar tarefa em background:", error);
      }
    };

    registerBackgroundTask();

    return () => {
      notificationReceivedListener.remove();
      notificationResponseListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      return;
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fd5ba9');
    }, [])
  );

  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="fd5ba9" /> */}
      <View style={styles.Content}>
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <View>
              <Text style={styles.title}>Nova tarefa</Text>
              <Text style={styles.subtitle}>Quem planeja, realiza!</Text>
            </View>
            <TouchableOpacity
              style={styles.botaoNovaTarefa}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add-circle-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <TaskContainer tarefas={tarefas} loadTasks={loadTasks} />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Criar Nova Tarefa</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Título*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o título da tarefa"
                  value={titulo}
                  onChangeText={setTitulo}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  placeholder="Descreva sua tarefa"
                  value={descricao}
                  onChangeText={setDescricao}
                  multiline
                />
              </View>

              <View style={styles.datetimeContainer}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Data*</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenDatePicker(true)}
                  >
                    <Text>{formatarDataBrasileira(data)}</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Hora*</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenTimePicker(true)}
                  >
                    <Text>{formatarHora(horario)}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <DatePickerModal
                locale="pt"
                mode="single"
                visible={openDatePicker}
                onDismiss={() => setOpenDatePicker(false)}
                date={data ? new Date(data) : new Date()}
                onConfirm={({ date }) => {
                  setOpenDatePicker(false);
                  if (date) {
                    const formattedDate = date.toISOString().split("T")[0];
                    setData(formattedDate);
                  }
                }}
              />

              <TimePickerModal
                locale="pt"
                visible={openTimePicker}
                onDismiss={() => setOpenTimePicker(false)}
                onConfirm={({ hours, minutes }) => {
                  setOpenTimePicker(false);
                  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                  setHorario(formattedTime);
                }}
                hours={
                  horario
                    ? parseInt(horario.split(":")[0])
                    : new Date().getHours()
                }
                minutes={
                  horario
                    ? parseInt(horario.split(":")[1])
                    : new Date().getMinutes()
                }
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setModalVisible(false);
                    resetForm();
                  }}
                >
                  <Text style={styles.closeButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreateTask}
                >
                  <Text style={styles.createButtonText}>Criar Tarefa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
