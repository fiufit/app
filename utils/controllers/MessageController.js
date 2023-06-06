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

  onGetMessagesFromConversationWithUsers(conversationId, onGet) {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("conversationId", "==", conversationId));

    return onSnapshot(q, (snapshot) => {
      const conversationsData = snapshot.docs.map((doc) => doc.data());
      onGet(conversationsData);
    });
  }

  async writeMessageToConversationWithUsers(messageData) {
    if (messageData.conversationId) {
      const messagesRef = collection(db, "messages");
      const docRef = await addDoc(messagesRef, messageData);

      const conversationRef = doc(
        db,
        "conversations",
        messageData.conversationId
      );

      await updateDoc(conversationRef, {
        lastMessage: messageData.message,
        lastMessageTimestamp: messageData.timestamp,
        lastMessageWasRead: messageData.read,
        lastMessageFrom: messageData.from,
      });

      const message = {
        ...messageData,
        id: docRef.id,
      };

      return { message, conversationId: messageData.conversationId };
    } else {
      const conversationsRef = collection(db, "conversations");

      let newConversationId;

      try {
        const docRef = await addDoc(conversationsRef, {
          members: [messageData.from, messageData.to],
          lastMessage: messageData.message,
          lastMessageTimestamp: messageData.timestamp,
          lastMessageWasRead: messageData.read,
          lastMessageFrom: messageData.from,
        });

        newConversationId = docRef.id;
      } catch (error) {
        newConversationId = error.message.split("/").at(-1);
        console.log("ERROR", newConversationId);
      }

      const messagesRef = collection(db, "messages");

      try {
        await addDoc(messagesRef, {
          ...messageData,
          conversationId: newConversationId,
        });
      } catch (error) {
        console.log(error);
      }

      const message = {
        ...messageData,
        id: newConversationId,
      };

      return { message, conversationId: newConversationId };
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
