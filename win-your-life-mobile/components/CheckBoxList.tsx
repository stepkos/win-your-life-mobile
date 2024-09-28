import { Ionicons } from "@expo/vector-icons";
import { Checkbox, CheckboxIndicator, CheckboxLabel } from "./ui/checkbox";

const data = ["medytacja", "2 litry wody", "basen", "fiszki", "20 min nauki"];

export default function CheckBoxList() {
  return (
    <>
      {data.map((item: string) => (
        <Checkbox
          key={item}
          size="lg"
          isInvalid={false}
          isDisabled={false}
          value={item}
        >
          <CheckboxIndicator>
            <Ionicons name="checkmark-sharp" />
          </CheckboxIndicator>
          <CheckboxLabel>{item}</CheckboxLabel>
        </Checkbox>
      ))}
    </>
  );
}
