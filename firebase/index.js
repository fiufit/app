import {
  GoogleAuthProvider,
  getAuth,
  initializeAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  DEFAULT_PROFILE_PICTURE_URL,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const auth = getAuth();
const storage = getStorage();
export const db = getFirestore();

export const DEFAULT_PROFILE_PICTURE = DEFAULT_PROFILE_PICTURE_URL;
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
};
