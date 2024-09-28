import { Ionicons } from "@expo/vector-icons";
import { Checkbox, CheckboxIndicator, CheckboxLabel } from "./ui/checkbox";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

const data = [
  "Drink a glass of water in the morning",
  "Read for 30 minutes",
  "Exercise for 20 minutes",
  "Meditate for 10 minutes",
  "Write in a journal",
  "Plan your day",
  "Take a walk",
  "Eat a healthy breakfast",
  "Practice gratitude",
  "Learn a new skill",
  "Limit social media use",
  "Get 8 hours of sleep",
  "Declutter your space",
  "Connect with a friend",
  "Practice deep breathing",
];

export default function CheckBoxList() {
  return (
    <View className="gap-5">
      {data.map((item: string) => (
        <Checkbox
          key={item}
          isInvalid={false}
          isDisabled={false}
          value={item}
          style={{
            width: "100%", // Custom width
            height: 50, // Custom height
            borderRadius: 10,
            borderColor: "#D8A25E",
            borderWidth: 2,
            padding: 10,
          }}
        >
          <CheckboxIndicator>
            <Ionicons name="checkmark-sharp" />
          </CheckboxIndicator>

          <CheckboxLabel style={{ color: "#410B0B" }}>
            <ThemedText>{item}</ThemedText>
          </CheckboxLabel>
        </Checkbox>
      ))}
    </View>
  );
}
