require('dotenv').config();

export default {
    extra: {
        apiGatewayUrl: process.env.API_GATEWAY_URL,
        expoProjectId: process.env.EXPO_PROJECT_ID,
        firebaseConfig: {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
        emailVerifyUrl: process.env.FIREBASE_EMAIL_VERIFY_URL,
        defaultProfilePictureUrl: process.env.DEFAULT_PROFILE_PICTURE_URL,
        googleAuthConfig: {
            expoClientId: process.env.EXPO_CLIENT_ID,
            scopes: ["profile", "email"],
            redirectUri: process.env.EXPO_REDIRECT_URI,
        }
    },
};
