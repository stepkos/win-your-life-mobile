import { Ionicons } from "@expo/vector-icons";
import { Checkbox, CheckboxIndicator, CheckboxLabel } from "./ui/checkbox";
import {
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native"; // Import TextInput and TouchableOpacity
import { ThemedText } from "./ThemedText";
import { useState } from "react"; // Import useState
import axios from "axios";
import { token, url } from "@/constants/Properties";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CheckBoxListProps {
  habits: string[];
}

export default function CheckBoxList({ habits }: CheckBoxListProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [data, setData] = useState<string[]>(habits);
  const [newTask, setNewTask] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(true);

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

  // Handler to add a new task
  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        await axios.post(
          url + "/habits/",
          {
            content: newTask.trim(), // Data (body) goes here
          },
          {
            headers: {
              Authorization: token, // Headers go here (note `Bearer`)
            },
          }
        );
        setData((prevData) => [...prevData, newTask.trim()]);
        setNewTask(""); // Clear the input field
      } catch (error) {
        console.error("Failed to add new task:", error);
      }
    }
  };

  const uncheckedItems = data.filter((item) => !checkedItems.includes(item));
  const checkedItemsAtBottom = data.filter((item) =>
    checkedItems.includes(item)
  );

  // Combine unchecked first, checked at bottom
  const reorderedData = [...uncheckedItems, ...checkedItemsAtBottom];

  return (
    <View style={styles.container}>
      {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className="gap-5 flex-col items-center">
          {reorderedData.map((item: string) => (
            <Checkbox
              key={item}
              isInvalid={false}
              isDisabled={false}
              value={item}
              isChecked={checkedItems.includes(item)} // Set checked state
              onChange={() => handleCheck(item)} // Handle check/uncheck
              style={styles.checkbox}
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
                    checkedItems.includes(item)
                      ? "line-through text-gray-900"
                      : ""
                  }
                >
                  {item}
                </ThemedText>
              </CheckboxLabel>
            </Checkbox>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343131",
  },
  scrollViewContent: {
    paddingBottom: 20, // Add padding to avoid content being hidden by the input field
  },
  checkbox: {
    width: "90%", // Custom width
    height: 50, // Custom height
    borderRadius: 10,
    borderColor: "#D8A25E",
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#343131",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#D8A25E",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 8,
    backgroundColor: "#D8A25E",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#E29330", // Set button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
