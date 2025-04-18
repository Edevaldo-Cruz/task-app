import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  View,
  Alert,
  Task,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/Themed";
import * as SQLite from "expo-sqlite";
import { Tarefas, TaskContainer } from "@/components/EditScreenInfo";
import { usePathname } from "expo-router";

const db = SQLite.openDatabaseSync("taskDatabase.db");

const initializeDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      descricao TEXT,
      horario TEXT,
      localizacao TEXT,
      status TEXT DEFAULT 'pendente' CHECK(status IN ('pendente', 'iniciada', 'finalizada', 'cancelada'))
    );
  `);
};

export default function TabOneScreen() {
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [horario, setHorario] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const loadTasks = () => {
    try {
      const query = "SELECT * FROM tarefas  WHERE status = 'iniciada'";

      const result = db.getAllSync<Tarefas>(query);
      setTarefas(result);
      console.log("Tarefas carregadas: ", result);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  useEffect(() => {
    initializeDB();
    loadTasks();
  }, []);

  return (
    <View style={styles.Content}>
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <View>
            <Text style={styles.title}>Tarefas em andamento</Text>
            <Text style={styles.subtitle}>Quem planeja, realiza!</Text>
          </View>
        </View>
      </View>
      <TaskContainer inProgress={true} tarefas={tarefas} loadTasks={loadTasks} />
      
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
    backgroundColor: "#855bfd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#fff",
    marginTop: 15,
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#855bfd",
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
