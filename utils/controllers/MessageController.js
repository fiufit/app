import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../../firebase";

class MessageController {

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

    const q = query(
        conversationRef,
        where("members", "in", [[currentUser, otherUser], [otherUser, currentUser]])
    );
    const querySnapshot = await getDocs(q);
    let conversation = null;
    querySnapshot.forEach((doc) => {
        conversation = doc.data();
        conversation.conversationId = doc.id;
    });

    return conversation;
  }

  onGetMessagesFromConversationWithUsers(aUserId, anotherUserId, onGet) {
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("from", "in", [aUserId, anotherUserId]),
      where("to", "in", [aUserId, anotherUserId])
    );

    return onSnapshot(q, (snapshot) => {
      const conversationsData = snapshot.docs.map((doc) => doc.data());
      onGet(conversationsData);
    });
  }

  async writeMessageToConversationWithUsers(messageData) {
    const conversationWithUsers = await this.getConversationWithUsers(
      messageData.from,
      messageData.to
    );

    if (conversationWithUsers) {
      const messagesRef = collection(db, "messages");

      messageData.conversationId = conversationWithUsers.conversationId;

      await addDoc(messagesRef, messageData);

      // const addedDoc = await getDoc(docRef);

      const conversationsRef = collection(db, "conversations");
      const conversationDocRef = doc(
        conversationsRef,
        conversationWithUsers.conversationId
      );

      await updateDoc(conversationDocRef, {
        lastMessage: messageData.message,
        lastMessageTimestamp: messageData.timestamp,
        lastMessageWasRead: messageData.read,
        lastMessageFrom: messageData.from,
      });

      return messageData;
    } else {
      const conversationsRef = collection(db, "conversations");

      let docRef;

      try {
        docRef = await addDoc(conversationsRef, {
          members: [messageData.from, messageData.to],
          lastMessage: messageData.message,
          lastMessageTimestamp: messageData.timestamp,
          lastMessageWasRead: messageData.read,
          lastMessageFrom: messageData.from,
        });
      } catch (error) {}

      const addedDoc = await getDoc(docRef);

      const newConversationId = addedDoc.id;

      const messagesRef = collection(db, "messages");


      try {
        await addDoc(messagesRef, {
          ...messageData,
          conversationId: newConversationId,
        });
      } catch (error) {}

      // const addedDocMessage = await getDoc(docRefMessage);

      // return addedDocMessage.data();
      return {
        ...messageData,
        conversationId: newConversationId,
      }
    }
  }

  onGetAllConversations(onGet) {
    return onSnapshot(collection(db, "conversations"), (snapshot) => {
      const conversationsData = snapshot.docs.map((doc) => doc.data());
      onGet(conversationsData);
    });
  }

  onGetAllMessages(onGet) {
    return onSnapshot(collection(db, "messages"), (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data());
      onGet(messagesData);
    });
  }

  readLastMessageFromConversation(conversationId) {
    const conversationRef = doc(db, "conversations", conversationId);
    updateDoc(conversationRef, {
      lastMessageWasRead: true,
    });
  }

  async getConversationsFromUser(userId) {
    const conversationsRef = collection(db, "conversations");
    const messagesRef = collection(db, "messages");
    const q = query(
      conversationsRef,
      where("members", "array-contains", userId)
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

        return {
          ...data,
          conversationId: docConversation.id,
        };
      }
    );

    const conversations = await Promise.all(conversationsPromises);
    return conversations;
  }

  onGetConversationsFromUser(userId, onGet) {
    const conversationsRef = collection(db, "conversations");
    const q = query(
      conversationsRef,
      where("members", "array-contains", userId)
    );

    return onSnapshot(q, async (snapshot) => {
      const conversationsData = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          conversationId: doc.id,
        };
      });
      onGet(conversationsData);
    });
  }
}

export default MessageController;
