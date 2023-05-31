import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase";

class MessageController {
  constructor() {}

  async getConversationById(conversationId) {
    const docRef = doc(db, "conversations", conversationId);
    const docSnap = await getDoc(docRef);

    const data = await docSnap.data();

    return data;
  }

  async getMessagesFromConversationId(conversationId) {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("conversationId", "==", conversationId));
    const querySnapshot = await getDocs(q);

    const messages = await Promise.all(
      querySnapshot.docs.map((doc) => doc.data())
    );

    return messages;
  }

  async getConversationWithUsers(currentUser, otherUser) {
    const conversationRef = collection(db, "conversations");

    const currentUserQuery = query(
      conversationRef,
      where("members", "array-contains", currentUser)
    );

    const otherUserQuery = query(
      conversationRef,
      where("members", "array-contains", otherUser)
    );

    const [currentUserConversations, otherUserConversations] =
      await Promise.all([getDocs(currentUserQuery), getDocs(otherUserQuery)]);

    const currentUserConversationIds = currentUserConversations.docs.map(
      (doc) => doc.id
    );
    const otherUserConversationIds = otherUserConversations.docs.map(
      (doc) => doc.id
    );

    const commonConversationIds = currentUserConversationIds.filter(
      (conversationId) => otherUserConversationIds.includes(conversationId)
    );

    if (commonConversationIds.length === 0) {
      return null; // Return null if no conversation is found
    }

    const conversationId = commonConversationIds[0];
    const conversationSnapshot = await getDoc(
      doc(conversationRef, conversationId)
    );

    if (!conversationSnapshot.exists()) {
      return null; // Return null if conversation document does not exist
    }

    const conversation = conversationSnapshot.data();

    return {
      ...conversation,
      conversationId: conversationId,
    };
  }

  async getMessagesFromConversationWithUsers(currentUser, otherUser) {
    const messagesRef = collection(db, "messages");
    const conversationWithUsers = await this.getConversationWithUsers(
      currentUser,
      otherUser
    );
    if (conversationWithUsers) {
      const q = query(
        messagesRef,
        where("conversationId", "==", conversationWithUsers.conversationId)
      );
      const querySnapshot = await getDocs(q);

      const messages = await Promise.all(
        querySnapshot.docs.map((doc) => doc.data())
      );

      return messages;
    } else {
      return [];
    }
  }

  async writeMessageToConversationWithUsers(messageData) {
    const conversationWithUsers = await this.getConversationWithUsers(
      messageData.from,
      messageData.to
    );

    if (conversationWithUsers) {
      const messagesRef = collection(db, "messages");

      messageData.conversationId = conversationWithUsers.conversationId;

      const docRef = await addDoc(messagesRef, messageData);

      const addedDoc = await getDoc(docRef);

      return addedDoc.data();
    } else {
      const conversationsRef = collection(db, "conversations");

      const docRef = await addDoc(conversationsRef, {
        members: [messageData.from, messageData.to],
      });

      const addedDoc = await getDoc(docRef);

      const newConversationId = addedDoc.id;

      const messagesRef = collection(db, "messages");

      const docRefMessage = await addDoc(messagesRef, {
        ...messageData,
        conversationId: newConversationId,
      });

      const addedDocMessage = await getDoc(docRefMessage);

      return addedDocMessage.data();
    }
  }

  onGetConversationById(conversationId, onGet) {
    return onSnapshot(doc(db, "conversations", conversationId), (doc) => {
      const conversationData = doc.data();

      onGet(conversationData);
    });
  }

  async getConversationsFromUser(userName) {
    const conversationsRef = collection(db, "conversations");
    const messagesRef = collection(db, "messages");
    const q = query(
      conversationsRef,
      where("members", "array-contains", userName)
    );
    const querySnapshot = await getDocs(q);

    const conversationsPromises = querySnapshot.docs.map(
      async (docConversation) => {
        const data = docConversation.data();
        const qMessages = query(
          messagesRef,
          where("conversationId", "==", docConversation.id)
        );
        const querySnapshotMessages = await getDocs(qMessages);
        const messages = await Promise.all(
          querySnapshotMessages.docs.map((docMessage) => docMessage.data())
        );

        let highestTimestamp = new Date("2023-05-30T12:34:56.789Z");
        let lastMessage = "";
        let messageWasRead;

        for (const message of messages) {
          const timestamp = new Date(message.timestamp);
          if (timestamp > highestTimestamp) {
            highestTimestamp = timestamp;
            lastMessage = message.message;
            messageWasRead = message.read;
          }
        }

        return {
          ...data,
          lastMessage: lastMessage,
          conversationId: docConversation.id,
          timestamp: highestTimestamp.toISOString(),
          read: messageWasRead,
        };
      }
    );

    const conversations = await Promise.all(conversationsPromises);
    return conversations;
  }
}

export default MessageController;
