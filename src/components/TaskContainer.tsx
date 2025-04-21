import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import TaskCard from "./TaskCard";

export type Tarefas = {
  id: number;
  titulo: string;
  descricao: string;
  horario: string;
  data: string;
  status: string;
};

interface TaskContainerProps {
  tarefas: Tarefas[];
  loadTasks: () => void;
  inProgress?: boolean;
  finished?: boolean;
}

export function TaskContainer({
  tarefas,
  loadTasks,
  inProgress,
  finished,
}: TaskContainerProps) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>Tarefas pendentes:</Text>

        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskCard
              tarefa={item}
              onUpdate={loadTasks}
              inProgress={inProgress}
              finished={finished}
            />
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
