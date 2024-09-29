

import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Streak from "@/components/Streak";
import { url, token } from "@/constants/Properties";

const iconSize = 24;
const fontSize = 20;

export default function FriendsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from /user/friend/");
        const response = await axios.get(url + "/user/friend/", {
          headers: {
            Authorization: token,
          },
        });
        console.log("Response data:", response.data);
        setData(response.data.content); // Set the data in state
        setLoading(false); // Stop loading indicator
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
          setError(error.message);
        } else {
          console.error("Unexpected error:", error);
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
      <View style={styles.container}>
        <ThemedText>{error}</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your friends</ThemedText>
      </ThemedView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <ThemedText>{item.user_info.first_name}</ThemedText>
            <Streak
              days={item.user_info.streak}
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
  container: {
    flex: 1,
    backgroundColor: "#343131",
    justifyContent: "center",
    alignItems: "center",
  },
  viewComponent: {
    backgroundColor: "#343131",
    paddingBottom: 50,
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
    paddingTop: 50,
    gap: 8,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    gap: 8,
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: fontSize,
    borderWidth: 1,
    borderColor: "#D8A25E",
    marginTop: 10,
    marginBottom: 16, // Add margin to increase the gap between friends
  },
});
