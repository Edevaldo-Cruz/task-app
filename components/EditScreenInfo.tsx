import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "./Themed";
import TaskCard from "./taskCard";

export type Tarefas = {
  id: number;
  titulo: string;
  descricao: string;
  horario: string;
  localizacao: string;
  status: string;
};

interface TaskContainerProps {
  tarefas: Tarefas[];
  loadTasks: () => void;
}

export function TaskContainer({ tarefas, loadTasks }: TaskContainerProps) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>Tarefas pendentes:</Text>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskCard tarefa={item} onUpdate={loadTasks} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    height: "90%",
    paddingInline: 20,
    paddingTop: 15,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: "#ededf0",
    top: -40,
    zIndex: 1,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
});
