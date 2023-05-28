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

  async writeMessageToConversationId(messageData) {
    const messagesRef = collection(db, "messages");

    const docRef = await addDoc(messagesRef, messageData);

    const addedDoc = await getDoc(docRef);

    return addedDoc.data();
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

        let highestTimestamp = 0;
        let lastMessage = "";
        let messageWasRead;

        for (const message of messages) {
          const timestamp = parseInt(message.timestamp);
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
          timestamp: highestTimestamp,
          read: messageWasRead,
        };
      }
    );

    const conversations = await Promise.all(conversationsPromises);
    return conversations;
  }
}

export default MessageController;
