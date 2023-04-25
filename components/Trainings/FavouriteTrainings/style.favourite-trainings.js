import { StyleSheet } from "react-native";
import {MEDIUM_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 220,
        display: "flex",
        gap: 10
    },
    title: {
        fontFamily: "Lato_700Bold",
        fontSize: 18,
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        width: "96%",
        alignItems: 'flex-end',
        justifyContent: "space-between",
    },
    seeAll: {
        fontSize: 13.5,
        fontFamily: "Lato_700Bold",
        color: MEDIUM_GREY
    },
    trainingsContainer: {
        display: "flex",
        flexDirection: "row",
    },
    trainingCard: {
        width: 200,
        height: "45%",
        borderRadius: 9,
        backgroundColor: WHITE
    },
    cardColumn: {
        display: "flex",
        gap: 10,
        marginRight: 15,
    }
});
