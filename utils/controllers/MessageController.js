import {
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

    const conversationsPromises = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const qMessages = query(
        messagesRef,
        where("conversationId", "==", doc.id)
      );
      const querySnapshotMessages = await getDocs(qMessages);
      const messages = await Promise.all(
        querySnapshotMessages.docs.map((doc) => doc.data())
      );

      let highestTimestamp = 0;
      let lastMessage = "";

      for (const message of messages) {
        const timestamp = parseInt(message.timestamp);
        if (timestamp > highestTimestamp) {
          highestTimestamp = timestamp;
          lastMessage = message.message;
        }
      }

      return {
        ...data,
        lastMessage: lastMessage,
      };
    });

    const conversations = await Promise.all(conversationsPromises);
    return conversations;
  }
}

export default MessageController;
