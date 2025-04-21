import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";

interface EditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  titulo: string;
  setTitulo: (value: string) => void;
  descricao: string;
  setDescricao: (value: string) => void;
  data: string;
  setData: (value: string) => void;
  horario: string;
  setHorario: (value: string) => void;
  openDatePicker: boolean;
  setOpenDatePicker: (value: boolean) => void;
  openTimePicker: boolean;
  setOpenTimePicker: (value: boolean) => void;
  formatarDataBrasileira: (date: string) => string;
  formatarHora: (time: string) => string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onClose,
  onSave,
  titulo,
  setTitulo,
  descricao,
  setDescricao,
  data,
  setData,
  horario,
  setHorario,
  openDatePicker,
  setOpenDatePicker,
  openTimePicker,
  setOpenTimePicker,
  formatarDataBrasileira,
  formatarHora,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Tarefa</Text>

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
              horario ? parseInt(horario.split(":")[0]) : new Date().getHours()
            }
            minutes={
              horario
                ? parseInt(horario.split(":")[1])
                : new Date().getMinutes()
            }
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton} onPress={onSave}>
              <Text style={styles.createButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTaskModal;
