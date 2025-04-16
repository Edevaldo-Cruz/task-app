import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";

export default function TabOneScreen() {
  return (
    <View style={styles.Content}>
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Nova tafera</Text>
          <TouchableOpacity
            style={styles.botaoNovaTarefa}
            onPress={() => console.log("Criar tarefa")}
          >
            <Ionicons name="add-circle-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  Content: {
    height: "100%",

    backgroundColor: "#",
  },
  container: {
    height: "20%",
    backgroundColor: "#fd5ba9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fd5ba9",
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
});
