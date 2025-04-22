import React from "react";
import { FlatList, Text, View } from "react-native";
import TaskCard from "../TaskCard";
import { styles } from "./styles";

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
          renderItem={({ item, index }) => (
            <TaskCard
              tarefa={item}
              onUpdate={loadTasks}
              inProgress={inProgress}
              finished={finished}
              index={index}
            />
          )}
        />
      </View>
    </View>
  );
}
