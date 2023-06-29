import {
  BLACK, DARK_BLUE,
  SECONDARY_WHITE,
} from "../../utils/colors";
import { Modal, Portal } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";

import { WHITE } from "../../utils/colors";
import { interests } from "../../utils/trainings";
import { styles } from "./styles.InterestsModal";
import CloseIcon from "../../assets/images/general/closeIcon.svg";

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
        <View
          style={styles.modalContent}
        >
          <CloseIcon
              color={"black"}
              height={30}
              width={30}
              position={"absolute"}
              top={10}
              right={10}
              onPress={() => {
                setModalIsVisible(false);
              }}
          />
          <Text style={styles.modalTitle}>
            {" "}
            Choose up to {converter.toWords(MAX_INTERESTS)} topics you might
            find interesting!
          </Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestChip,
                  {
                    backgroundColor: selectedInterests.includes(interest)
                      ? DARK_BLUE
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
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default InterestsModal;
