import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import ConversationHeader from "../ConversationHeader/ConversationHeader";
import Message from "../Message/Message";
import MessageController from "../../utils/controllers/MessageController";
import MessageInput from "../MessageInput/MessageInput";
import { QUINARY_GREY } from "../../utils/colors";
import { styles } from "./styles.Conversation";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const Conversation = ({ navigation, route }) => {
  const {
    conversationId: initialConversationId,
    otherUserName,
    otherUserId,
    otherUserProfilePicture,
  } = route.params;
  const [conversationId, setConversationId] = useState(initialConversationId);
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const isFocused = useIsFocused();

  const userData = useRecoilValue(userDataState);

  const addNewMessages = (data) => {
    if(data.length){
      setConversationId(data[0].conversationId);
    }
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

    setMessages(
      newMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    );
  };

  useEffect(() => {
    const messageController = new MessageController();
    const unSubscribe =
      messageController.onGetMessagesFromConversationWithUsers(
        userData.ID,
        otherUserId,
        (data) => {
          addNewMessages(data);
          setIsLoadingMessages(false);
        }
      );

    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    if (isFocused && conversationId) {
      if (messages.length > 0) {
        const lastMessage = messages[0];
        if (lastMessage.from !== userData.ID) {
          const messageController = new MessageController();
          messageController.readLastMessageFromConversation(conversationId);
        }
      }
    }
  }, [messages, isFocused, conversationId]);

  const handleSendMessage = async (inputMessage) => {
    const messageController = new MessageController();
    await messageController.writeMessageToConversationWithUsers({
      from: userData.ID,
      to: otherUserId,
      message: inputMessage,
      read: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleGoBack = () => {
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
      {isLoadingMessages && (
        <View style={styles.messagesLoaderContainer}>
          <ActivityIndicator
            size="large"
            color={QUINARY_GREY}
            style={styles.messagesLoader}
          />
        </View>
      )}
      <View style={styles.messageListContainer}>
        <View style={styles.messageList}>
          <FlatList
            inverted
            data={messages}
            renderItem={({ item }) => (
              <Message
                profileImage={item.image}
                message={item.message}
                isCurrentUser={item.from === userData.ID}
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
