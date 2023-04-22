import { Modal, Portal } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";

import Button from "../Shared/Button/button";
import { LinearGradient } from "expo-linear-gradient";
import { WHITE } from "../../utils/colors";
import { styles } from "./styles.InterestsModal";

const InterestsModal = ({
  modalIsVisible,
  setModalIsVisible,
  selectedInterests,
  setSelectedInterests,
}) => {
  const interests = [
    // TODO: Fetch interests from Database.
    "Strength",
    "Speed",
    "Endurance",
    "Lose weight",
    "Gain weight",
    "Yoga",
  ];

  const handleInterestPress = (interest) => {
    const newSelectedInterests = [...selectedInterests];
    const index = newSelectedInterests.indexOf(interest);

    if (index !== -1) {
      newSelectedInterests.splice(index, 1);
    } else {
      if (selectedInterests.length < 2) {
        newSelectedInterests.push(interest);
      }
    }

    setSelectedInterests(newSelectedInterests);
  };

  return (
    <Portal>
      <Modal
        visible={modalIsVisible}
        onDismiss={() => {
          setModalIsVisible(false);
        }}
        contentContainerStyle={styles.interestsModal}
      >
        <LinearGradient
          colors={["rgb(185, 213, 123)", "#FFFFFF"]}
          style={styles.modalContent}
        >
          <Text style={styles.modalTitle}>
            {" "}
            Choose two topics you might find interesting!
          </Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestChip,
                  {
                    backgroundColor: selectedInterests.includes(interest)
                      ? "#008F39"
                      : "#F2F2F2",
                  },
                ]}
                onPress={() => handleInterestPress(interest)}
              >
                <Text
                  style={[
                    styles.interestText,
                    {
                      color: selectedInterests.includes(interest)
                        ? "#FFF"
                        : "#000",
                    },
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              textColor={WHITE}
              fontSize={14}
              style={styles.closeButton}
              onPress={() => {
                setModalIsVisible(false);
              }}
            >
              Close
            </Button>
          </View>
        </LinearGradient>
      </Modal>
    </Portal>
  );
};

export default InterestsModal;
