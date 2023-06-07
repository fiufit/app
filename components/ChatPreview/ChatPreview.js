import { Image, Text, View } from "react-native";

import { styles } from "./styles.ChatPreview.js";

const ChatPreview = ({
  imageSource,
  name,
  lastMessage,
  lastMessageTime,
  hasUnreadMessage,
  lastMessageSender,
}) => {
  const MAX_CHARACTER_LENGTH = 16;
  const truncatedLastMessage = truncateLastMessage(
    lastMessage,
    MAX_CHARACTER_LENGTH
  );

  function truncateLastMessage(message, maxLength) {
    if (message.length > maxLength) {
      return message.substring(0, maxLength - 3) + "...";
    }
    return message;
  }

  return (
    <View
      style={[
        styles.chatPreviewContainer,
        hasUnreadMessage && styles.chatPreviewContainerWithUnreadMessage,
      ]}
    >
      <Image style={styles.profileImage} source={{ uri: imageSource }} />
      <View style={styles.messageTextContainer}>
        <Text style={styles.textName}>{name}</Text>
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessageSender}>{lastMessageSender}: </Text>
          <View>
            <Text
              style={[
                styles.lastMessage,
                hasUnreadMessage && styles.unreadMessage,
              ]}
              numberOfLines={1}
            >
              {truncatedLastMessage}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
    </View>
  );
};

export default ChatPreview;
