import { StyleSheet } from "react-native";
import {DARK_GREY, GREY, LIGHT_GREY, WHITE} from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: GREY,
        display: "flex",
        alignItems: "center",
        position: "relative",
    },
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
        marginTop: "25%",
        width: "80%",
        marginBottom: 10
    },
    usersContainer: {
        width: "90%",
    },
    userCard: {
        width: '85%',
        height: 75,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 10
    },
    nickname: {
        fontFamily: "Lato_700Bold",
    },
    name: {
        fontFamily: "Lato_400Regular",
        color: DARK_GREY
    },
    profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: LIGHT_GREY,
        resizeMode: 'cover',
    },
});
