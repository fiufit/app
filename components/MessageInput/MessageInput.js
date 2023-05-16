import { TextInput, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles.MessageInput.js";

const MessageInput = ({ placeholder, onSendMessage }) => {
  return (
    <View style={styles.messageInputContainer}>
      <TextInput style={styles.messageInput} placeholder={placeholder} />
      <TouchableOpacity
        onPress={onSendMessage}
        style={styles.messageSendButton}
      >
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
