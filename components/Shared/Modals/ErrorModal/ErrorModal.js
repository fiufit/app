import { Modal, Portal } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles.ErrorModal";

const ErrorModal = ({
  modalIsVisible,
  setModalIsVisible,
  errorTitle,
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
        <View style={styles.container}>
          <View style={styles.redHalf}>
            <MaterialIcons name="dangerous" size={90} color="white" />
          </View>
          <View style={styles.whiteHalf}>
            <Text style={styles.title}>{errorTitle}</Text>
            <Text style={styles.errorDescription}>{errorDescription}</Text>
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

export default ErrorModal;
