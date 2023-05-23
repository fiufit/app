import { ScrollView, TouchableOpacity, View } from "react-native";

import ChatPreview from "../ChatPreview/ChatPreview";
import Input from "../Shared/Input/input";
import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import SearchIcon from "../../assets/images/general/searchIcon.svg";
import { WHITE } from "../../utils/colors";
import { styles } from "./styles.MessagingView";
import { useState } from "react";

const MessagingView = ({ navigation }) => {
  const [searchedUser, setSearchedUser] = useState("");

  const handleNewMessage = () => {
    navigation.navigate({
      name: "Search View",
      merge: true,
      params: {
        searchForUsers: true,
        messageUsers: true,
      },
    });
  };

  const handleConversationPress = (conversationId) => {
    navigation.navigate("Conversation", { conversationId: conversationId });
  };

  const chatPreviews = [
    {
      name: "Alejandro",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: true,
      conversationId: 1,
    },
    {
      name: "Alejo",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 2,
    },
    {
      name: "Barbara",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 3,
    },
    {
      name: "Carlos",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 1,
    },
    {
      name: "Carla",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 2,
    },
    {
      name: "Cecilia",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 3,
    },
    {
      name: "Dario",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 1,
    },
    {
      name: "Pedro",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: true,
      conversationId: 2,
    },
    {
      name: "Pablo",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 3,
    },
    {
      name: "Cristian",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 1,
    },
    {
      name: "Pepe",
      imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
      lastMessage: "Hey, how is it going?",
      lastMessageTime: "10:30 AM",
      hasUnreadMessage: false,
      conversationId: 2,
    },
    {
      name: "Jorge",
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
        <MessagingTopBar onEditPress={handleNewMessage} />
      </View>
      <View style={styles.usersSearchBar}>
        <Input
          placeholder={"Search user"}
          backgroundColor={WHITE}
          height={50}
          marginTop={15}
          onChangeText={(searchedUser) => setSearchedUser(searchedUser)}
          left={<SearchIcon />}
        ></Input>
      </View>
      <ScrollView style={styles.chatPreviewList}>
        {chatPreviews
          .filter((chatPreview) => chatPreview.name.startsWith(searchedUser))
          .map((chatPreview, chatPreviewIndex) => (
            <TouchableOpacity
              onPress={() =>
                handleConversationPress(chatPreview.conversationId)
              }
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
