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
          size="lg"
          isInvalid={false}
          isDisabled={false}
          value={item}
          className="gap-5"
        >
          <CheckboxIndicator>
            <Ionicons name="checkmark-sharp" />
          </CheckboxIndicator>
          <CheckboxLabel>
            <ThemedText>{item}</ThemedText>
          </CheckboxLabel>
        </Checkbox>
      ))}
    </View>
  );
}
