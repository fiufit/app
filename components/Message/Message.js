import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles.Message.js";

const Message = ({ profileImage, message, isCurrentUser, timestamp }) => {
  return (
    <View
      style={
        isCurrentUser ? styles.containerCurrentUser : styles.messageContainer
      }
    >
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <TouchableOpacity
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.bubbleCurrentUser : null,
        ]}
      >
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Message;
