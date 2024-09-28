import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface StreakProps {
  days: number;
  type: "fire" | "won" | "lost";
  unit: "days" | "weeks";
}

export default function Streak({ days, type, unit }: StreakProps) {
  const color = type === "fire" ? "#FFB01E" : type === "won" ? "#D8A25E" : "#A04747";
  const icon =
    type === "fire" ? "flame" : type === "won" ? "checkmark" : "skull-outline";

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name={icon} size={48} color={color} />
      <Text style={{ fontSize: 30, marginLeft: 10, color: color }}>
        {days} {unit}
      </Text>
    </View>
  );
}
