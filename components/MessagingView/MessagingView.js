import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { QUINARY_GREY, WHITE } from "../../utils/colors";
import { useEffect, useState } from "react";

import ChatPreview from "../ChatPreview/ChatPreview";
import Input from "../Shared/Input/input";
import MessageController from "../../utils/controllers/MessageController";
import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import RequestController from "../../utils/controllers/RequestController";
import SearchIcon from "../../assets/images/general/searchIcon.svg";
import { auth } from "../../firebase";
import { styles } from "./styles.MessagingView";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const MessagingView = ({ navigation }) => {
  const [searchedUser, setSearchedUser] = useState("");
  const [chatPreviews, setChatPreviews] = useState([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  const [user] = useAuthState(auth);

  const userData = useRecoilValue(userDataState);

  useEffect(() => {
    const messageController = new MessageController();

    const unSubscribe = messageController.onGetConversationsFromUser(
      userData.ID,
      async (data) => {
        const newChatPreviews = await Promise.all(
          data.map(async (item) => {
            const otherMemberId = item.members.find(
              (member) => member !== userData.ID
            );

            const controller = new RequestController(user);

            const userDataFetched = await controller.fetch(
              `users/${otherMemberId}`,
              "GET"
            );

            const otherUser = userDataFetched.data;
            const imageSource = otherUser?.PictureUrl;
            const otherMemberName = otherUser.DisplayName;

            return {
              otherMemberName: otherMemberName,
              otherMemberId: otherMemberId,
              imageSource: imageSource,
              lastMessage: item.lastMessage,
              lastMessageFrom: item.lastMessageFrom,
              lastMessageTime: item.lastMessageTimestamp,
              hasUnreadMessage: !item.lastMessageWasRead,
              conversationId: item.conversationId,
            };
          })
        );
        setIsLoadingConversations(false);
        newChatPreviews.sort(
          (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
        );

        setChatPreviews(newChatPreviews);
      }
    );

    return () => unSubscribe();
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
    otherMemberId,
    otherUserProfilePicture
  ) => {
    navigation.navigate("Conversation", {
      conversationId: conversationId,
      otherUserName: otherUserName,
      otherUserId: otherMemberId,
      otherUserProfilePicture: otherUserProfilePicture,
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
      {isLoadingConversations && (
        <View>
          <ActivityIndicator
            size="large"
            color={QUINARY_GREY}
            style={styles.conversationLoader}
          />
        </View>
      )}
      <ScrollView style={styles.chatPreviewList}>
        {chatPreviews
          .filter((chatPreview) =>
            chatPreview.otherMemberName.startsWith(searchedUser)
          )
          .map((chatPreview, chatPreviewIndex) => (
            <TouchableOpacity
              onPress={() =>
                handleConversationPress(
                  chatPreview.conversationId,
                  chatPreview.otherMemberName,
                  chatPreview.otherMemberId,
                  chatPreview.imageSource
                )
              }
              style={styles.chatPreviewContainer}
              key={chatPreviewIndex}
            >
              <ChatPreview
                imageSource={chatPreview.imageSource}
                name={chatPreview.otherMemberName}
                lastMessage={chatPreview.lastMessage}
                lastMessageTime={new Date(
                  chatPreview.lastMessageTime
                ).toLocaleString("en-US", {
                  timeZone: "America/Argentina/Buenos_Aires",
                })}
                hasUnreadMessage={
                  chatPreview.hasUnreadMessage &&
                  chatPreview.lastMessageFrom != userData.ID
                }
                lastMessageSender={
                  chatPreview.lastMessageFrom == userData.ID
                    ? "You"
                    : chatPreview.otherMemberName
                }
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default MessagingView;
