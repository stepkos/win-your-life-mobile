import { Ionicons } from "@expo/vector-icons";
import { Checkbox, CheckboxIndicator, CheckboxLabel } from "./ui/checkbox";
import { View, LayoutAnimation, Platform, UIManager } from "react-native"; // Import LayoutAnimation and UIManager
import { ThemedText } from "./ThemedText";
import { useState } from "react"; // Import useState

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Handler to toggle checked state
  const handleCheck = (item: string) => {
    // Animate layout change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setCheckedItems((prevChecked) => {
      if (prevChecked.includes(item)) {
        // If already checked, uncheck it
        return prevChecked.filter((checkedItem) => checkedItem !== item);
      } else {
        // Otherwise, add it to checked
        return [...prevChecked, item];
      }
    });
  };

  const uncheckedItems = data.filter((item) => !checkedItems.includes(item));
  const checkedItemsAtBottom = data.filter((item) =>
    checkedItems.includes(item)
  );

  // Combine unchecked first, checked at bottom
  const reorderedData = [...uncheckedItems, ...checkedItemsAtBottom];

  return (
    <View className="gap-5 flex-col items-center">
      {reorderedData.map((item: string) => (
        <Checkbox
          key={item}
          isInvalid={false}
          isDisabled={false}
          value={item}
          isChecked={checkedItems.includes(item)} // Set checked state
          onChange={() => handleCheck(item)} // Handle check/uncheck
          style={{
            width: "90%", // Custom width
            height: 50, // Custom height
            borderRadius: 10,
            borderColor: "#D8A25E",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <CheckboxIndicator>
            <Ionicons
              name="checkmark-sharp"
              color={checkedItems.includes(item) ? "#000" : "#fff"}
            />
          </CheckboxIndicator>

          <CheckboxLabel style={{ color: "#410B0B" }}>
            <ThemedText
              className={
                checkedItems.includes(item) ? "line-through text-gray-900" : ""
              }
            >
              {item}
            </ThemedText>
          </CheckboxLabel>
        </Checkbox>
      ))}
    </View>
  );
}
