import { Image, StyleSheet, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Streak from "@/components/Streak";
import { Button, ButtonText } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { url, token } from "@/constants/Properties";

interface User {
  first_name: string;
  last_name: string;
  streak: number;
}

export default function AccountScreen() {
  const fontSize = 24;
  const iconSize = 48;

  const [data, setData] = useState<User | null>(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/user/info/", {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data.content);
        setData(response.data.content); // Set the fetched data
        setLoading(false); // Stop loading indicator
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message); // Handle Axios errors
        } else {
          setError("An unexpected error occurred"); // Handle general errors
        }
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText>Error: {error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/john-cena.png")}
          style={styles.reactLogo}
        />
      }
    >
      {data && (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Hello, {data.first_name}!</ThemedText>
          </ThemedView>
          <Button style={styles.button}>
            <ButtonText className="text-lg">
              <ThemedText style={{ color: "#000000" }}>Add Friends</ThemedText>
            </ButtonText>
          </Button>
          {/* Display the streak */}
          <View style={styles.streakContainer}>
            <Streak
              days={data.streak}
              type="fire"
              unit="days"
              fontSize={fontSize}
              iconSize={iconSize}
              style={{
                container: [styles.streakItem, { borderColor: "#FFB01E" }],
              }}
            />
          </View>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "",
  },
  reactLogo: {
    height: 300,
    width: 500,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  streakContainer: {
    gap: 8,
    marginTop: 20,
  },
  streakItem: {
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#E29330",
    color: "#410B0B",
    height: 50,
    marginVertical: 10,
  },
});
