import { initializeApp } from 'firebase/app';

import {getAuth, signInWithEmailAndPassword, initializeAuth, signOut, GoogleAuthProvider, signInWithCredential} from "firebase/auth";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
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
const storage = getStorage();

export const DEFAULT_PROFILE_PICTURE = "https://firebasestorage.googleapis.com/v0/b/fiufit.appspot.com/o/profile_pictures%2Fdefault.png?alt=media&token=8242ac98-c07e-4217-8f07-3fddc5a727bc";
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

export const uploadImage = async (anImage, imagePath) => {
    if(anImage){
        try{
            const response = await fetch(anImage);
            const blob = await response.blob();
            const storageRef = ref(storage, imagePath);
            const uploadResult = await uploadBytes(storageRef, blob)
            return await getDownloadURL(uploadResult.ref);
        } catch (e) {
            alert(e);
        }
    }
}

export const getImageUrl = async (imagePath) => {
    try{
        const storageRef = ref(storage, imagePath);
        return await getDownloadURL(storageRef);
    } catch (e){
        return null;
    }
}
