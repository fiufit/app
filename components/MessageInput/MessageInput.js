import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles.MessageInput.js";
import { useState } from "react";

const MessageInput = ({ placeholder, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    Keyboard.dismiss();
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <View style={styles.messageInputContainer}>
      <TextInput
        style={styles.messageInput}
        placeholder={placeholder}
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <TouchableOpacity
        onPress={handleSendMessage}
        style={styles.messageSendButton}
      >
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
