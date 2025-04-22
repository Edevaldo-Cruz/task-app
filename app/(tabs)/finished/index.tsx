import React, { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";

import { styles } from "./styles";
import { Tarefas, TaskContainer } from "@/components/TaskContainer";

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

export default function Finished() {
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);

  const loadTasks = () => {
    try {
      const query = "SELECT * FROM tarefas  WHERE status = 'finalizada'";

      const result = db.getAllSync<Tarefas>(query);
      setTarefas(result);
      console.log("Tarefas finalizadas carregadas: ", result);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  useEffect(() => {
    initializeDB();
    loadTasks();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#05521d" />
      <View style={styles.Content}>
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <View>
              <Text style={styles.title}>Tarefas finalizadas</Text>
              <Text style={styles.subtitle}>
                Parabéns! Mais uma conquista alcançada. O sucesso é a soma dos
                pequenos esforços diários.
              </Text>
            </View>
          </View>
        </View>
        <TaskContainer
          inProgress={false}
          tarefas={tarefas}
          loadTasks={loadTasks}
          finished={true}
        />
      </View>
    </>
  );
}
