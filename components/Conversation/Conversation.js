import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { useEffect, useState } from "react";

import ConversationHeader from "../ConversationHeader/ConversationHeader";
import Message from "../Message/Message";
import MessageController from "../../utils/controllers/MessageController";
import MessageInput from "../MessageInput/MessageInput";
import { styles } from "./styles.Conversation";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const Conversation = ({ navigation, route }) => {
  const {
    conversationId,
    otherUserName,
    otherUserId,
    otherUserProfilePicture,
  } = route.params;
  const [messages, setMessages] = useState([]);
  const isFocused = useIsFocused();

  const userData = useRecoilValue(userDataState);

  const addNewMessages = (data) => {
    const newMessages = data.map((message) => {
      return {
        image:
          message.from === userData.ID
            ? userData.PictureUrl
            : otherUserProfilePicture,
        message: message.message,
        from: message.from,
        timestamp: message.timestamp,
      };
    });

    const uniqueNewMessages = newMessages.filter(
      (newMessage) =>
        !messages.some(
          (message) =>
            message.from === newMessage.from &&
            message.timestamp === newMessage.timestamp
        )
    );

    uniqueNewMessages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    setMessages([...messages, ...uniqueNewMessages]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const messageController = new MessageController();
      const conversationWithUsers =
        await messageController.getConversationWithUsers(
          userData.ID,
          otherUserId
        );
      if (conversationWithUsers) {
        const unSubscribe =
          messageController.onGetMessagesFromConversationWithUsers(
            conversationWithUsers,
            (data) => {
              addNewMessages(data);
            }
          );

        return () => {
          unSubscribe();
        };
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.from != userData.ID) {
          const messageController = new MessageController();
          messageController.readLastMessageFromConversation(conversationId);
        }
      }
    }
  }, [messages]);

  const handleSendMessage = async (inputMessage) => {
    const messageController = new MessageController();

    const newMessage =
      await messageController.writeMessageToConversationWithUsers({
        from: userData.ID,
        to: otherUserId,
        message: inputMessage,
        read: false,
        timestamp: new Date().toISOString(),
      });

    setMessages([
      ...messages,
      {
        image: userData.PictureUrl,
        message: newMessage.message,
        from: userData.ID,
        timestamp: newMessage.timestamp,
      },
    ]);
  };

  const handleGoBack = () => {
    //Before going back, the attribute hasUnreadMessage from the conversation should be set to false.
    setMessages([]);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.conversationContainer}>
      <View style={styles.conversationHeaderContainer}>
        <ConversationHeader
          onGoBack={handleGoBack}
          name={otherUserName}
          profileImage={otherUserProfilePicture}
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
                isCurrentUser={item.from == userData.ID}
                timestamp={new Date(item.timestamp).toLocaleString("en-US", {
                  timeZone: "America/Argentina/Buenos_Aires",
                })}
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
