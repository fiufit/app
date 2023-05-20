import { ScrollView, TouchableOpacity, View } from "react-native";

import ChatPreview from "../ChatPreview/ChatPreview";
import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import { styles } from "./styles.MessagingView";

const MessagingView = ({ navigation }) => {
  const handleEditPress = () => {
    // handle edit button press
  };

  const handleConversationPress = (conversationId) => {
    navigation.navigate("Conversation", { conversationId: conversationId });
  };

  const chatPreviews = [
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: true,
      conversationId: 1,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 2,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 3,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 1,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 2,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 3,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 1,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: true,
      conversationId: 2,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 3,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 1,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 2,
    },
    {
      name: "John Lennon",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 3,
    },
  ];

  return (
    <View style={styles.messagingViewContainer}>
      <View style={styles.messagingTopBarContainer}>
        <MessagingTopBar onEditPress={handleEditPress} />
      </View>
      <ScrollView style={styles.chatPreviewList}>
        {chatPreviews.map((chatPreview, chatPreviewIndex) => (
          <TouchableOpacity
            onPress={() => handleConversationPress(chatPreview.conversationId)}
            style={styles.chatPreviewContainer}
            key={chatPreviewIndex}
          >
            <ChatPreview
              imageSource={chatPreview.imageSource}
              name={chatPreview.name}
              lastMessage={chatPreview.lastMessage}
              lastMessageTime={chatPreview.lastMessageTime}
              hasUnreadMessage={chatPreview.hasUnreadMessage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MessagingView;
