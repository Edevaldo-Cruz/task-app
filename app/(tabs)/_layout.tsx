import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Novas Tarefas",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="inProgress"
        options={{
          title: "Em Andamento",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-o" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="finished"
        options={{
          title: "Finalizados",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="check-circle" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
