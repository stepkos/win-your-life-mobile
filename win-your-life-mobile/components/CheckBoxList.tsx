import { Ionicons } from "@expo/vector-icons";
import { Checkbox, CheckboxIndicator, CheckboxLabel } from "./ui/checkbox";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

const data = ["medytacja", "2 litry wody", "basen", "fiszki", "20 min nauki"];

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
            backgroundColor: "#D8A25E"
          }}

        >
          <CheckboxIndicator 
          >
            <Ionicons name="checkmark-sharp" />
          </CheckboxIndicator>

          <CheckboxLabel style={{ color: "#410B0B", }}>
            <ThemedText>{item}</ThemedText>
          </CheckboxLabel>
        </Checkbox>
      ))}
    </View>
  );
}
