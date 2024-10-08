import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CheckBoxList from "@/components/CheckBoxList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Habit } from "@/interfaces/Habit";
import { url, token } from "@/constants/Properties";
import Streak from "@/components/Streak";
import { User } from "@/interfaces/User";

export default function HomeScreen() {
  const [data, setData] = useState<Habit[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(url + "/habits/", {
          headers: {
            Authorization: token,
          },
        });
        setData(responseData.data); // Set the data in state

        const responseUser = await axios.get(url + "/user/info/", {
          headers: {
            Authorization: token,
          },
        });
        setUser(responseUser.data.content); // Set the user data
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
        <ThemedText type="subtitle" style={styles.stickyTitle}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "space-between",
            }}
          >
            <ThemedText style={{ marginRight: 15 }}>Your streak is </ThemedText>
            <Streak
              days={user?.streak}
              type="fire"
              unit="days"
              iconSize={20}
              fontSize={16}
            />
          </View>
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
    paddingTop: 40,
    backgroundColor: "#A04747",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 1,
    gap: 5,
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
