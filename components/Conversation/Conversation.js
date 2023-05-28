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
  const { conversationId, otherUserName, otherUserProfilePicture } =
    route.params;
  const [messages, setMessages] = useState([]);

  const userData = useRecoilValue(userDataState);

  const addNewMessages = (data) => {
    const newMessages = data.map((message) => {
      return {
        image: otherUserProfilePicture,
        message: message.message,
        isCurrentUser: message.from === userData.DisplayName,
        timestamp: message.timestamp,
      };
    });
    setMessages([...messages, ...newMessages]);
  };

  useEffect(() => {
    const messageController = new MessageController();
    messageController
      .getMessagesFromConversationId(conversationId)
      .then((data) => {
        addNewMessages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [conversationId]);

  const handleSendMessage = (inputMessage) => {
    const messageController = new MessageController();
    messageController
      .writeMessageToConversationId({
        conversationId: conversationId,
        from: userData.DisplayName,
        message: inputMessage,
        read: false,
        timestamp: 30,
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

    console.log(inputMessage);
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
