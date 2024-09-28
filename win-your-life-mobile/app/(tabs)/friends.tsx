
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, FlatList } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Streak from "@/components/Streak";

const data = [
  { name: "Alice", streak: 5 },
  { name: "Bob", streak: 3 },
  { name: "Charlie", streak: 7 },
  { name: "David", streak: 2 },
  { name: "Eve", streak: 4 },
  { name: "Frank", streak: 6 },
  { name: "Grace", streak: 1 },
  { name: "Hank", streak: 8 },
  { name: "Ivy", streak: 9 },
  { name: "Jack", streak: 10 },
];

const iconSize = 24;
const fontSize = 20;

export default function FriendsScreen() {
  return (
    <View style={styles.viewComponent}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your friends</ThemedText>
      </ThemedView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <ThemedText>{item.name}</ThemedText>
            <Streak
              days={item.streak}
              type="fire"
              unit="days"
              fontSize={fontSize}
              iconSize={iconSize}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewComponent: {
    backgroundColor: "#343131",
    paddingBottom: 100,
    paddingTop: 50,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: fontSize,
    borderWidth: 1,
    borderColor: "#D8A25E",
  },
});
