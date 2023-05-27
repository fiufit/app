import { ScrollView, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import ChatPreview from "../ChatPreview/ChatPreview";
import Input from "../Shared/Input/input";
import MessageController from "../../utils/controllers/MessageController";
import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import SearchIcon from "../../assets/images/general/searchIcon.svg";
import { WHITE } from "../../utils/colors";
import { styles } from "./styles.MessagingView";

const MessagingView = ({ navigation }) => {
  const [searchedUser, setSearchedUser] = useState("");
  const [chatPreviews, setChatPreviews] = useState([]);

  useEffect(() => {
    const messageController = new MessageController();

    messageController
      .getConversationsFromUser("pepe")
      .then((data) => {
        const newChatPreviews = data.map((item) => ({
          name: item.members.join(", "),
          imageSource: "https://randomuser.me/api/portraits/men/75.jpg",
          lastMessage: "Hey, how is it going?",
          lastMessageTime: "10:30 AM",
          hasUnreadMessage: true,
          conversationId: 1,
        }));
        setChatPreviews([...chatPreviews, ...newChatPreviews]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
