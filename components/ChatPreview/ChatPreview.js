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
          <Text
            style={[
              styles.lastMessage,
              hasUnreadMessage && styles.unreadMessage,
            ]}
          >
            {lastMessage}
          </Text>
        </View>
      </View>
      <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
    </View>
  );
};

export default ChatPreview;
