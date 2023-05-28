import { ScrollView, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import ChatPreview from "../ChatPreview/ChatPreview";
import Input from "../Shared/Input/input";
import MessageController from "../../utils/controllers/MessageController";
import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import SearchIcon from "../../assets/images/general/searchIcon.svg";
import { WHITE } from "../../utils/colors";
import { styles } from "./styles.MessagingView";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const MessagingView = ({ navigation }) => {
  const [searchedUser, setSearchedUser] = useState("");
  const [chatPreviews, setChatPreviews] = useState([]);
  const [remountConversation, setRemountConversation] = useState(false);

  const userData = useRecoilValue(userDataState);

  useEffect(() => {
    const messageController = new MessageController();

    messageController
      .getConversationsFromUser(userData.DisplayName)
      .then((data) => {
        const newChatPreviews = data.map((item) => {
          const otherMemberName = item.members.find(
            (member) => member !== userData.DisplayName
          );
          return {
            name: otherMemberName,
            imageSource: "https://randomuser.me/api/portraits/men/77.jpg", //TODO: Fetch image from Firebase.
            lastMessage: item.lastMessage,
            lastMessageTime: item.timestamp,
            hasUnreadMessage: item.hasUnreadMessage,
            conversationId: item.conversationId,
          };
        });
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

  const handleConversationPress = (
    conversationId,
    otherUserName,
    otherUserProfilePicture
  ) => {
    setRemountConversation(!remountConversation);
    navigation.navigate("Conversation", {
      conversationId: conversationId,
      otherUserName: otherUserName,
      otherUserProfilePicture: otherUserProfilePicture,
      remountConversation: remountConversation,
    });
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
                handleConversationPress(
                  chatPreview.conversationId,
                  chatPreview.name,
                  chatPreview.imageSource
                )
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
