import { FlatList, View } from "react-native";

import Message from "../Message/Message";

const Conversation = () => {
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
  );
};

export default Conversation;
