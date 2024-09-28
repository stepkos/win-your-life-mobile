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
      <Button>
        <ButtonText className="text-lg">Add friends</ButtonText>
      </Button>
      <View style={styles.streakContainer}>
        <View style={styles.streakItem}>
          <Streak days={data.streakDays} type="fire" unit="days" />
        </View>
        <View style={styles.streakItem}>
          <Streak days={data.wonDays} type="won" unit="days" />
          <Streak days={data.wonWeeks} type="won" unit="weeks" />
        </View>
        <View style={styles.streakItem}>
          <Streak days={data.lostDays} type="lost" unit="days" />
          <Streak days={data.lostWeeks} type="lost" unit="weeks" />
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
    borderColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
});
