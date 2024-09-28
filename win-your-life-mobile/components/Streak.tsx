import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface StreakProps {
  days: number;
}

export default function Streak({ days }: StreakProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="flame" size={48} color="orange" />
      <Text style={{ fontSize: 36, marginLeft: 10, color: "orange" }}>
        {days}
      </Text>
    </View>
  );
}
