import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "./ThemedText";

interface StreakProps {
  days: number;
  type: "fire" | "won" | "lost";
  unit: "days" | "weeks";
  iconSize: number;
  fontSize: number;
  style?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
}

export default function Streak({
  days,
  type,
  unit,
  iconSize,
  fontSize,
  style = {},
}: StreakProps) {
  const color =
    type === "fire" ? "#FFB01E" : type === "won" ? "#D8A25E" : "#A04747";
  const icon =
    type === "fire" ? "flame" : type === "won" ? "checkmark" : "skull-outline";

  return (
    <View
      style={[{ flexDirection: "row", alignItems: "center" }, style.container]}
    >
      <Ionicons name={icon} size={iconSize} color={color} />
      <ThemedText
        style={[
          { fontSize: fontSize, marginLeft: fontSize * 0.5, color: color },
          style.text,
        ]}
      >
        {days} {unit}
      </ThemedText>
    </View>
  );
}
