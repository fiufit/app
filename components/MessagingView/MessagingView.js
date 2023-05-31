import { ScrollView, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import ChatPreview from "../ChatPreview/ChatPreview";
import Input from "../Shared/Input/input";
import MessageController from "../../utils/controllers/MessageController";
import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import RequestController from "../../utils/controllers/RequestController";
import SearchIcon from "../../assets/images/general/searchIcon.svg";
import { WHITE } from "../../utils/colors";
import { auth } from "../../firebase";
import { styles } from "./styles.MessagingView";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const MessagingView = ({ navigation }) => {
  const [searchedUser, setSearchedUser] = useState("");
  const [chatPreviews, setChatPreviews] = useState([]);
  const [remountConversation, setRemountConversation] = useState(false);

  const [user] = useAuthState(auth);

  const userData = useRecoilValue(userDataState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messageController = new MessageController();
        const data = await messageController.getConversationsFromUser(
          userData.DisplayName
        );

        const newChatPreviews = await Promise.all(
          data.map(async (item) => {
            const otherMemberName = item.members.find(
              (member) => member !== userData.DisplayName
            );

            const controller = new RequestController(user);
            const userDataFetched = await controller.fetch(
              `users?name=${otherMemberName}`,
              "GET"
            );

            const otherUser = userDataFetched.data.users[0];
            const imageSource = otherUser.PictureUrl;

            return {
              name: otherMemberName,
              imageSource: imageSource,
              lastMessage: item.lastMessage,
              lastMessageTime: item.timestamp,
              hasUnreadMessage: item.hasUnreadMessage,
              conversationId: item.conversationId,
            };
          })
        );

        setChatPreviews((prevChatPreviews) => [
          ...prevChatPreviews,
          ...newChatPreviews,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
                lastMessageTime={new Date(
                  chatPreview.lastMessageTime
                ).toLocaleString("en-US", {
                  timeZone: "America/Argentina/Buenos_Aires",
                })}
                hasUnreadMessage={chatPreview.hasUnreadMessage}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default MessagingView;
