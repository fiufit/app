import { RED, WHITE } from "../../../../utils/colors";
import { Modal, Portal } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { styles } from "./styles.ErrorModal";

const ErrorModal = ({
  modalIsVisible,
  setModalIsVisible,
  errorDescription,
}) => {
  return (
    <Portal>
      <Modal
        visible={modalIsVisible}
        onDismiss={() => {
          setModalIsVisible(false);
        }}
        contentContainerStyle={styles.errorModal}
      >
        <LinearGradient colors={[RED, WHITE]} style={styles.modalContent}>
          <Text style={styles.modalTitle}>{errorDescription}</Text>
        </LinearGradient>
      </Modal>
    </Portal>
  );
};

export default ErrorModal;
