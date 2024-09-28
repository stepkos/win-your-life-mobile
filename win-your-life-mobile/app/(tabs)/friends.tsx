import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your friends</ThemedText>
      </ThemedView>
      {data.map((friend) => (
        <ThemedView key={friend.name} style={styles.friendContainer}>
          <ThemedText>{friend.name}</ThemedText>
          <Streak
            days={friend.streak}
            type="fire"
            unit="days"
            fontSize={fontSize}
            iconSize={iconSize}
          />
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
