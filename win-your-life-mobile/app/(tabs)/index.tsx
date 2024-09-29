import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CheckBoxList from "@/components/CheckBoxList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Habit } from "@/interfaces/Habit";

export default function HomeScreen() {
  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("dupa");
        const response = await axios.get(
          "http://46.41.142.19/djangofett/habits/",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3Njg3ODE3LCJpYXQiOjE3Mjc1Nzk4MTcsImp0aSI6IjA0NmJmMDBiMGNjNDQ0Y2I4ZGI1MjYzZGVlODNjYTY2IiwidXNlcl9pZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSJ9.DUiilVyKKEBSbj9z15QyIsahLlar5BTXu9kNg18Ra24",
            },
          }
        );
        console.log("lol");
        // const response = await fetch("http://192.168.121.213:8000/habits/");
        // console.log("");
        // const data = await response.json();
        // console.log(data);
        setData(response.data); // Set the data in state
        setLoading(false); // Stop loading indicator
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <ThemedText>{error}</ThemedText>
      </View>
    );
  }

  const habits = data.map((habit) => habit.content);
  console.log(habits);

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <ThemedText type="title" style={styles.stickyTitle}>
          Your streak is 10 days
        </ThemedText>
        <ThemedText type="title" style={styles.stickyTitle}>
          Today's goals:
        </ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CheckBoxList habits={habits} />
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
    width: "100%",
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
    paddingBottom: 165,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 1,
  },
  stickyTitle: {
    color: "#fff",
  },
});
