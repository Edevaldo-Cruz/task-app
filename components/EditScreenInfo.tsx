import React from "react";
import { StyleSheet } from "react-native";

import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";
import TaskCard from "./taskCard";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>Tarefas:</Text>

        <TaskCard />
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
  card: {
    height: 80,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginVertical: 10,
    padding: 10,
  },
  cardNameTask: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    height: "80%",
    width: "10%",
    backgroundColor: "#191830",
    borderRadius: 14,
    gap: 10,
  },
  cardText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerTextcard: {
    alignItems: "center",
    width: 250,
    backgroundColor: "#CCC",
    marginLeft: 10,
  },

  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
