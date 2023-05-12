import { ScrollView, TouchableOpacity, View } from "react-native";

import ChatPreview from "../ChatPreview/ChatPreview";
import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import { styles } from "./styles.MessagingView";

const MessagingView = ({ navigation }) => {
  const handleEditPress = () => {
    // handle edit button press
  };

  const handleConversationPress = () => {
    console.log("Conversation pressed!");
  };

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.messagingTopBarContainer}>
        <MessagingTopBar onEditPress={handleEditPress} />
      </View>
      <TouchableOpacity
        onPress={handleConversationPress}
        style={styles.chatPreviewContainer}
      >
        <ChatPreview
          imageSource={require("../../assets/googleIcon.png")}
          name="John Doe"
          lastMessage="Hey, how's it going?"
          lastMessageTime="10:30 AM"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleConversationPress}
        style={styles.chatPreviewContainer}
      >
        <ChatPreview
          imageSource={require("../../assets/googleIcon.png")}
          name="John Doe"
          lastMessage="Hey, how's it going?"
          lastMessageTime="10:30 AM"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleConversationPress}
        style={styles.chatPreviewContainer}
      >
        <ChatPreview
          imageSource={require("../../assets/googleIcon.png")}
          name="John Doe"
          lastMessage="Hey, how's it going?"
          lastMessageTime="10:30 AM"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MessagingView;
