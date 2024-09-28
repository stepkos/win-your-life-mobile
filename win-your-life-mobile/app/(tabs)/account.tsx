import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Collapsible } from "@/components/Collapsible";
import Streak from "@/components/Streak";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button";
import { Line } from "react-native-svg";

interface StreakItem {
  amount: number;
  color: string;
  type: "fire" | "won" | "lost";
  unit: "days" | "weeks";
}

const data: {
  name: string;
  streakItems: StreakItem[];
} = {
  name: "John Doe",
  streakItems: [
    {
      amount: 80,
      color: "#FFB01E",
      type: "fire",
      unit: "days",
    },
    {
      amount: 71,
      color: "#D8A25E",
      type: "won",
      unit: "days",
    },
    {
      amount: 10,
      color: "#D8A25E",
      type: "won",
      unit: "weeks",
    },
    {
      amount: 9,
      color: "#A04747",
      type: "lost",
      unit: "days",
    },
    {
      amount: 1,
      color: "#A04747",
      type: "lost",
      unit: "weeks",
    },
  ],
};

const fontSize = 24;
const iconSize = 48;

export default function AccountScreen() {
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello, {data.name}!</ThemedText>
      </ThemedView>
      <Button style={styles.button}>
        <ButtonText className="text-lg">
          <ThemedText style={{ color: "#000000" }}>Add Friends</ThemedText>
        </ButtonText>
      </Button>
      <View style={styles.streakContainer}>
        {data.streakItems.map((item, index) => (
          <Streak
            key={index}
            days={item.amount}
            type={item.type}
            unit={item.unit}
            fontSize={fontSize}
            iconSize={iconSize}
            style={{
              container: [styles.streakItem, { borderColor: item.color }],
            }}
          />
        ))}
      </View>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
  },
});
