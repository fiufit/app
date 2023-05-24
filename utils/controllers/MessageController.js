import {db} from "../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
class MessageController{

    constructor() {
    }

    async getConversationById(converstionId){
        const docRef = doc(db, "conversations", converstionId);
        const docSnap = await getDoc(docRef);

        const data = await docSnap.data();

        console.log("conversacion", data);
        return data;
    }

    onGetConversationById(converstionId, onGet){
        return onSnapshot(doc(db, "conversations", converstionId), (doc) => {
            const conversationData = doc.data();

            onGet(conversationData);
        });
    }

}


export default MessageController;
