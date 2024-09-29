import {
  Image,
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Streak from "@/components/Streak";
import { Button, ButtonText } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { url, token } from "@/constants/Properties";

interface User {
  first_name: string;
  last_name: string;
  streak: number;
}

export default function AccountScreen() {
  const fontSize = 24;
  const iconSize = 48;

  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [friendEmail, setFriendEmail] = useState(""); // State for friend's email
  const [friendError, setFriendError] = useState<string | null>(null); // Error handling for adding friend
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/user/info/", {
          headers: {
            Authorization: token,
          },
        });
        setData(response.data.content);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    setFriendEmail(""); // Clear the input field
    setFriendError(null); // Clear error message
    setSuccessMessage(null); // Clear success message
  };

  // Handle adding a friend with a POST request
  const handleAddFriend = async () => {
    if (!friendEmail.trim()) {
      setFriendError("Email cannot be empty."); // Show error if email is empty
      return;
    }

    try {
      const response = await axios.post(
        url + "/user/friend/",
        { friend_email: friendEmail.trim() }, // Send the email as friend_email in the POST request body
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSuccessMessage("Friend added successfully!"); // Show success message
      setFriendError(null); // Clear previous errors
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFriendError(
          error.response?.data?.message || "Failed to add friend."
        ); // Display error message
      } else {
        setFriendError("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText>Error: {error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/profile-pic.webp")}
          style={styles.reactLogo}
        />
      }
    >
      {data && (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Hello, {data.first_name}!</ThemedText>
          </ThemedView>
          <Button style={styles.button} onPress={handleOpenModal}>
            <ButtonText className="text-lg">
              <ThemedText style={{ color: "#000000" }}>Add Friends</ThemedText>
            </ButtonText>
          </Button>

          {/* Display the streak */}
          <View style={styles.streakContainer}>
            <Streak
              days={data.streak}
              type="fire"
              unit="days"
              fontSize={fontSize}
              iconSize={iconSize}
              style={{
                container: [styles.streakItem, { borderColor: "#FFB01E" }],
              }}
            />
          </View>

          {/* Modal for adding friends */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleCloseModal} // Handle closing on Android back button
          >
            <TouchableWithoutFeedback onPress={handleCloseModal}>
              <View style={styles.modalBackground}>
                <TouchableWithoutFeedback onPress={() => null}>
                  <View style={styles.modalContent}>
                    <ThemedText style={styles.modalTitle}>
                      Add a Friend
                    </ThemedText>
                    <TextInput
                      style={styles.input}
                      placeholder="Friend's Email"
                      value={friendEmail}
                      onChangeText={setFriendEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {/* Show error message */}
                    {friendError && (
                      <ThemedText style={styles.errorText}>
                        {friendError}
                      </ThemedText>
                    )}
                    {/* Show success message */}
                    {successMessage && (
                      <ThemedText style={styles.successText}>
                        {successMessage}
                      </ThemedText>
                    )}
                    <Button style={styles.addButton} onPress={handleAddFriend}>
                      <ButtonText style={styles.friendButton}>
                        Add Friend
                      </ButtonText>
                    </Button>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 300,
    width: 500,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  streakContainer: {
    gap: 8,
    marginTop: 20,
  },
  streakItem: {
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#E29330",
    color: "#410B0B",
    height: 50,
    marginVertical: 10,
  },
  modalBackground: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#A04747",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#D8A25E",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#F8F8F8",
  },
  addButton: {
    backgroundColor: "#E29330",
    paddingVertical: 1,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 10,
  },
});
