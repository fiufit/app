import { StyleSheet } from "react-native";
import {DARK_BLUE, DARK_GREY, GREY, LIGHT_GREY, SECONDARY_GREY} from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: GREY,
        display: 'flex',
        paddingTop: 70,
        alignItems: "center",
        gap: 10
    },
    searchAndBackContainer: {
      display: 'flex',
      flexDirection: "row",
      width: '100%',
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    divider: {
        height: 1,
        backgroundColor: SECONDARY_GREY,
        width: "100%",
        opacity: 0.5
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
    profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: LIGHT_GREY,
        resizeMode: 'cover',
    },
    loadingPicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: LIGHT_GREY,
    },
    loadingNickname: {
        height: 10,
        width: 150,
        backgroundColor: LIGHT_GREY,
        borderRadius: 10,
        marginBottom: 10
    },
    loadingName: {
        height: 10,
        width: 100,
        backgroundColor: LIGHT_GREY,
        borderRadius: 10
    },
    nickname: {
        fontFamily: "Lato_700Bold",
    },
    name: {
        fontFamily: "Lato_400Regular",
        color: DARK_GREY
    }
});