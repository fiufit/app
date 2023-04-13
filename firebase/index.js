import { initializeApp } from 'firebase/app';

import {getAuth, signInWithEmailAndPassword, initializeAuth, signOut, GoogleAuthProvider, signInWithCredential} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
const firebaseConfig = {
    apiKey: "AIzaSyDbXF3gPXW-uggq-Fhsu_ANVgE-1mCYLcI", //TODO: Put this in an env file
    authDomain: "fiufit.firebaseapp.com",
    projectId: "fiufit",
    storageBucket: "fiufit.appspot.com",
    messagingSenderId: "235995330653",
    appId: "1:235995330653:web:43dcd2cdfab28df85c35b4",
    measurementId: "G-0W6BHPCT5D"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const auth = getAuth();
export const singIn = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        // TODO: change alert for an error modal with error interpretation
        alert(e)
    }
};
export const signOutFromApp = async (onSingOut) => {
    await signOut(auth);
    onSingOut();
};

export const signInWithGoogle = async (accessToken) => {
    try{
        const googleProvider = new GoogleAuthProvider();
        const credential = GoogleAuthProvider.credential(null, accessToken);

        return await signInWithCredential(auth, credential);
    }catch (e) {
        console.log(e);
    }
}
