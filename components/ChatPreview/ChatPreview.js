import { Image, Text, View } from "react-native";

import { styles } from "./styles.ChatPreview.js";

const ChatPreview = ({ imageSource, name, lastMessage, lastMessageTime }) => {
  return (
    <View style={styles.chatPreviewContainer}>
      <Image style={styles.profileImage} source={imageSource} />
      <View style={styles.messageTextContainer}>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
      <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
    </View>
  );
};

export default ChatPreview;
