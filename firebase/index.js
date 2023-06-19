import {
  GoogleAuthProvider,
  getAuth,
  initializeAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";
import Constants from "expo-constants";

const { firebaseConfig } = Constants.manifest.extra;

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const auth = getAuth();
const storage = getStorage();
export const db = getFirestore();

export const DEFAULT_PROFILE_PICTURE = Constants.manifest.extra.defaultProfilePictureUrl;
export const singIn = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw new Error(e.message);
  }
};
export const signOutFromApp = async (onSingOut) => {
  await signOut(auth);
  onSingOut();
};

export const signInWithGoogle = async (accessToken) => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const credential = GoogleAuthProvider.credential(null, accessToken);

    return await signInWithCredential(auth, credential);
  } catch (e) {
    console.log(e);
  }
};

export const uploadImage = async (anImage, imagePath) => {
  if (anImage) {
    try {
      const response = await fetch(anImage);
      const blob = await response.blob();
      const storageRef = ref(storage, imagePath);
      const uploadResult = await uploadBytes(storageRef, blob);
      return await getDownloadURL(uploadResult.ref);
    } catch (e) {
      throw new Error(e.message);
    }
  }
};

export const getImageUrl = async (imagePath) => {
  try {
    const storageRef = ref(storage, imagePath);
    return await getDownloadURL(storageRef);
  } catch (e) {
    return null;
  }
};

export const sendPasswordResetEmailTo = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e) {
        throw new Error(e.message);
    }
}
