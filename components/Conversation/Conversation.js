import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { useEffect, useState } from "react";

import ConversationHeader from "../ConversationHeader/ConversationHeader";
import Message from "../Message/Message";
import MessageController from "../../utils/controllers/MessageController";
import MessageInput from "../MessageInput/MessageInput";
import { styles } from "./styles.Conversation";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const Conversation = ({ navigation, route }) => {
  const {
    conversationId,
    otherUserName,
    otherUserProfilePicture,
    remountConversation,
  } = route.params;
  const [messages, setMessages] = useState([]);

  const userData = useRecoilValue(userDataState);

  const addNewMessages = (data) => {
    const newMessages = data.map((message) => {
      return {
        image:
          message.from === userData.DisplayName
            ? userData.PictureUrl
            : otherUserProfilePicture,
        message: message.message,
        isCurrentUser: message.from === userData.DisplayName,
        timestamp: message.timestamp,
      };
    });

    newMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    setMessages([...messages, ...newMessages]);
  };

  const fetchMessages = () => {
    const messageController = new MessageController();
    messageController
      .getMessagesFromConversationWithUsers(userData.DisplayName, otherUserName)
      .then((data) => {
        addNewMessages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const messageController = new MessageController();
    messageController.onGetAllMessages(() => {
      fetchMessages();
    });
  }, [remountConversation]);

  const handleSendMessage = (inputMessage) => {
    const messageController = new MessageController();
    messageController
      .writeMessageToConversationWithUsers({
        conversationId: conversationId,
        from: userData.DisplayName,
        to: otherUserName,
        message: inputMessage,
        read: false,
        timestamp: new Date().toISOString(),
      })
      .then((newMessage) => {
        setMessages([
          ...messages,
          {
            image: userData.PictureUrl,
            message: newMessage.message,
            isCurrentUser: true,
            timestamp: newMessage.timestamp,
          },
        ]);
      });
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
                isCurrentUser={item.isCurrentUser}
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
