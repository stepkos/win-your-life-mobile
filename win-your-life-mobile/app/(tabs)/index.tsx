import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CheckBoxList from "@/components/CheckBoxList";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <ThemedText type="title" style={styles.stickyTitle}>Your streak is 10 days</ThemedText>
        <ThemedText type="title" style={styles.stickyTitle}>Today's goals:</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CheckBoxList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343131",
    
  },
  stickyHeader: {
    width: '100%',
    padding: 20,
    backgroundColor: "#A04747",

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  scrollViewContent: {
    paddingTop: 32, // Adjust this value to ensure proper spacing under the sticky header
    marginTop: 160, // Adding top margin to create space before CheckBoxList
    paddingBottom:165,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 1,
  },
  stickyTitle: {
    color: "#fff"
  }
});
