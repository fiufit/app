import { StyleSheet } from "react-native";
import {DARK_BLUE, DARK_GREY, LIGHT_GREY, WHITE} from "../../../utils/colors";
const profilePictureDimention = 80;

export const styles = StyleSheet.create({
    profileDataSection: {
        width: "90%",
        height: "12%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 25,
        alignItems: "center",
    },
    profilePicture: {
        width: profilePictureDimention,
        height: profilePictureDimention,
        borderRadius: profilePictureDimention / 2,
        backgroundColor: LIGHT_GREY,
        resizeMode: 'cover',
    },
    nameAndFollowersContainer: {
        width: "60%",
        height: 70,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Poppins_500Medium',
        color: DARK_BLUE,
    },
    followers: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        color: DARK_GREY
    },
    upperSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        gap: 10
    },
    lowerSection: {
        flex: 1,
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    editProfileButton: {
        width: "45%",
        height: 20,
        backgroundColor: DARK_BLUE,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    },
    editProfileText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 10,
        color: WHITE
    }
})
