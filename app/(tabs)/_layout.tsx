import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Text } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Novas Tarefas",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#fd5ba9" : "#fd5ba94a", fontSize: 12 }}
            >
              Novas Tarefas
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" color={focused ? "#fd5ba9" : "#fd5ba94a"} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="inProgress"
        options={{
          title: "Em Andamento",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#855bfd" : "#865bfd4a", fontSize: 12 }}
            >
              Em Andamento
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="calendar-o"
              color={focused ? "#855bfd" : "#865bfd4a"}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="finished"
        options={{
          title: "Finalizados",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#05521d" : "#05521d4a", fontSize: 12 }}
            >
              Finalizados
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="check-circle"
              color={focused ? "#05521d" : "#05521d4a"}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
