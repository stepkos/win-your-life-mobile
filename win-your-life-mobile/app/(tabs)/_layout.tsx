import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const size = 25;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {},
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name={focused ? "people" : "people-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
