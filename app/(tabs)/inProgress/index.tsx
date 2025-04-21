import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { Tarefas, TaskContainer } from "@/components/TaskContainer";
import { useFocusEffect } from "expo-router";
import { styles } from "./styles";

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

export default function InProgress() {
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);

  const loadTasks = () => {
    try {
      const query = "SELECT * FROM tarefas  WHERE status = 'iniciada'";

      const result = db.getAllSync<Tarefas>(query);
      setTarefas(result);
      console.log("Tarefas finalizada carregadas: ", result);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const loadTasks2 = useCallback(() => {
    try {
      const query = "SELECT * FROM tarefas WHERE status = 'iniciada'";
      const result = db.getAllSync<Tarefas>(query);
      setTarefas(result);
      console.log("Tarefas carregadas:", result);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks2();

      return () => console.log("Tela perdeu foco");
    }, [loadTasks2])
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#855bfd" />
      <View style={styles.Content}>
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <View>
              <Text style={styles.title}>Tarefas finalizadas</Text>
              <Text style={styles.subtitle}>
                Cada passo te aproxima do seu objetivo. Continue firme, você
                está no caminho certo!
              </Text>
            </View>
          </View>
        </View>
        <TaskContainer
          inProgress={true}
          tarefas={tarefas}
          loadTasks={loadTasks}
        />
      </View>
    </>
  );
}
