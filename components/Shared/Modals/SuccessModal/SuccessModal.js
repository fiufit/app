import { Modal, Portal } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles.SuccessModal";

const SuccessModal = ({
  modalIsVisible,
  setModalIsVisible,
  modalTitle,
  modalDescription,
}) => {
  return (
    <Portal>
      <Modal
        visible={modalIsVisible}
        onDismiss={() => {
          setModalIsVisible(false);
        }}
        contentContainerStyle={styles.successModal}
      >
        <View style={styles.container}>
          <View style={styles.greenHalf}>
            <MaterialIcons name="check-circle" size={90} color="white" />
          </View>
          <View style={styles.whiteHalf}>
            <Text style={styles.title}>{modalTitle}</Text>
            <Text style={styles.successDescription}>{modalDescription}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalIsVisible(false);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default SuccessModal;
