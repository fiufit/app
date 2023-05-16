import { FlatList, KeyboardAvoidingView, View } from "react-native";

import ConversationHeader from "../ConversationHeader/ConversationHeader";
import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import { styles } from "./styles.Conversation";

const Conversation = ({ navigation, route }) => {
  const { conversationId } = route.params;

  const handleSendMessage = (inputMessage) => {
    //TODO: Send message to Backend.
    console.log(inputMessage);
  };

  const messages = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "Hello, how are you?",
      isCurrentUser: false,
      timestamp: "12:34 PM, May 12, 2023",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      message: "I'm doing great, thanks! How about you? ",
      isCurrentUser: true,
      timestamp: "12:36 PM, May 12, 2023",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "Hello, how are you?",
      isCurrentUser: false,
      timestamp: "12:34 PM, May 12, 2023",
    },
    {
      id: 4,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      message: "I'm doing great, thanks! How about you? ",
      isCurrentUser: true,
      timestamp: "12:36 PM, May 12, 2023",
    },
    {
      id: 5,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "Hello, how are you?",
      isCurrentUser: false,
      timestamp: "12:34 PM, May 12, 2023",
    },
    {
      id: 6,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      message: "I'm doing great, thanks! How about you? ",
      isCurrentUser: true,
      timestamp: "12:36 PM, May 12, 2023",
    },
    {
      id: 7,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "Hello, how are you?",
      isCurrentUser: false,
      timestamp: "12:34 PM, May 12, 2023",
    },
    {
      id: 8,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      message: "I'm doing great, thanks! How about you? ",
      isCurrentUser: true,
      timestamp: "12:36 PM, May 12, 2023",
    },
    {
      id: 9,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "Hello, how are you?",
      isCurrentUser: false,
      timestamp: "12:34 PM, May 12, 2023",
    },
    {
      id: 10,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      message: "I'm doing great, thanks! How about you? ",
      isCurrentUser: true,
      timestamp: "12:36 PM, May 12, 2023",
    },
    {
      id: 11,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "Hello, how are you?",
      isCurrentUser: false,
      timestamp: "12:34 PM, May 12, 2023",
    },
    {
      id: 12,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      message: "I'm doing great, thanks! How about you? ",
      isCurrentUser: true,
      timestamp: "12:36 PM, May 12, 2023",
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.conversationContainer}>
      <View style={styles.conversationHeaderContainer}>
        <ConversationHeader
          navigation={navigation}
          name={"Fetched Name"}
          profileImage={"https://randomuser.me/api/portraits/men/75.jpg"}
        />
      </View>
      <View style={styles.messageListContainer}>
        <View style={styles.messageList}>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Message
                profileImage={item.image}
                message={item.message}
                isCurrentUser={item.isCurrentUser}
                timestamp={item.timestamp}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.messageInputContainer}>
        <MessageInput
          placeholder="Type your message"
          onSendMessage={handleSendMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Conversation;
