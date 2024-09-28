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

const data = {
  name: "John Doe",
  streakDays: 80,
  wonDays: 71,
  wonWeeks: 10,
  lostDays: 9,
  lostWeeks: 1,
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
        <View style={styles.streakDays}>
          <Streak
            days={data.streakDays}
            type="fire"
            unit="days"
            fontSize={fontSize}
            iconSize={iconSize}
          />
        </View>
        <View style={styles.streakItem}>
          <Streak
            days={data.wonDays}
            type="won"
            unit="days"
            fontSize={fontSize}
            iconSize={iconSize}
          />
          <Streak
            days={data.wonWeeks}
            type="won"
            unit="weeks"
            fontSize={fontSize}
            iconSize={iconSize}
          />
        </View>
        <View style={styles.streakLost}>
          <Streak
            days={data.lostDays}
            type="lost"
            unit="days"
            fontSize={fontSize}
            iconSize={iconSize}
          />
          <Streak
            days={data.lostWeeks}
            type="lost"
            unit="weeks"
            fontSize={fontSize}
            iconSize={iconSize}
          />
        </View>
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
    borderColor: "#D8A25E",
    borderWidth: 5,
    borderRadius: 8,
    marginBottom: 8,
  },
  streakDays: {
    justifyContent: "space-between",
    padding: 16,
    borderColor: "#FFB01E",
    borderWidth: 5,
    borderRadius: 8,
    marginBottom: 8,
  },
  streakLost: {
    justifyContent: "space-between",
    padding: 16,
    borderColor: "#A04747",
    borderWidth: 5,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#E29330",
    color: "#410B0B",
  },
});
