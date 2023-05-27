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

  async getConversationById(converstionId) {
    const docRef = doc(db, "conversations", converstionId);
    const docSnap = await getDoc(docRef);

    const data = await docSnap.data();

    return data;
  }

  onGetConversationById(converstionId, onGet) {
    return onSnapshot(doc(db, "conversations", converstionId), (doc) => {
      const conversationData = doc.data();

      onGet(conversationData);
    });
  }

  async getConversationsFromUser(userName) {
    const conversationsRef = collection(db, "conversations");
    const q = query(
      conversationsRef,
      where("members", "array-contains", userName)
    );
    const querySnapshot = await getDocs(q);
    const conversations = querySnapshot.docs.map((doc) => doc.data());

    return conversations;
  }
}

export default MessageController;
