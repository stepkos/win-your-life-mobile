import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Checkbox, Provider as PaperProvider } from "react-native-paper";

const CheckboxList = () => {
  const [items, setItems] = useState([
    { id: 1, label: "Item 1", checked: false },
    { id: 2, label: "Item 2", checked: false },
    { id: 3, label: "Item 3", checked: false },
  ]);

  const toggleCheckbox = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Checkbox
        status={item.checked ? "checked" : "unchecked"}
        onPress={() => toggleCheckbox(item.id)}
      />
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CheckboxList;
