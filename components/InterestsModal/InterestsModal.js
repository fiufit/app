import {
  BLACK,
  SECONDARY_GREEN,
  SECONDARY_WHITE,
  TERCIARY_GREEN,
} from "../../utils/colors";
import { Modal, Portal } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";

import Button from "../Shared/Button/button";
import { LinearGradient } from "expo-linear-gradient";
import { WHITE } from "../../utils/colors";
import { styles } from "./styles.InterestsModal";
import {interests} from "../../utils/trainings";

const InterestsModal = ({
  modalIsVisible,
  setModalIsVisible,
  selectedInterests,
  setSelectedInterests,
}) => {
  const MAX_INTERESTS = 6;
  var converter = require("number-to-words");

  const handleInterestPress = (interest) => {
    const newSelectedInterests = [...selectedInterests];
    const index = newSelectedInterests.indexOf(interest);

    if (index !== -1) {
      newSelectedInterests.splice(index, 1);
    } else {
      if (selectedInterests.length < MAX_INTERESTS) {
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
          colors={[SECONDARY_GREEN, WHITE]}
          style={styles.modalContent}
        >
          <Text style={styles.modalTitle}>
            {" "}
            Choose {converter.toWords(MAX_INTERESTS)} topics you might find
            interesting!
          </Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestChip,
                  {
                    backgroundColor: selectedInterests.includes(interest)
                      ? TERCIARY_GREEN
                      : SECONDARY_WHITE,
                  },
                ]}
                onPress={() => handleInterestPress(interest)}
              >
                <Text
                  style={[
                    styles.interestText,
                    {
                      color: selectedInterests.includes(interest)
                        ? WHITE
                        : BLACK,
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
