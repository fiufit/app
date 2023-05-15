import { FlatList, View } from "react-native";

import ConversationHeader from "../ConversationHeader/ConversationHeader";
import Message from "../Message/Message";
import { styles } from "./styles.Conversation";

const Conversation = ({ navigation, route }) => {
  const { conversationId } = route.params;

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
  ];

  return (
    <View>
      <View style={styles.conversationHeaderContainer}>
        <ConversationHeader
          navigation={navigation}
          name={"Fetched Name"}
          profileImage={"https://randomuser.me/api/portraits/men/75.jpg"}
        />
      </View>
      <View style={styles.messageListContainer}>
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
  );
};

export default Conversation;
