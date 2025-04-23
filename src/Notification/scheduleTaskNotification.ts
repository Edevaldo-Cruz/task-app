import { Tarefa } from "app/(tabs)/index";
import * as Notifications from "expo-notifications";
import type { DateTriggerInput } from "expo-notifications";

export const scheduleTaskNotification = async (
  task: Tarefa
): Promise<string> => {
  const dateParts = task.data.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const timeParts = task.horario.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  const triggerDate = new Date(year, month, day, hours, minutes);

  if (isNaN(triggerDate.getTime())) {
    console.error("Data/horário inválidos");
    return "0";
  }

  if (triggerDate <= new Date()) {
    console.warn("Não é possível agendar notificação para data passada");
    return "0";
  }

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Lembrete: ${task.titulo}`,
        body: task.descricao || "Hora de realizar esta tarefa!",
        sound: true,
        data: { taskId: task.id },
      },
      trigger: {
        type: "date",
        date: triggerDate,
      } as DateTriggerInput,
    });

   

    return notificationId;
  } catch (error) {
    console.error("Erro ao agendar notificação:", error);
  }
  return "0";
};
