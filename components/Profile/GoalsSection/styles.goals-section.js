import { StyleSheet } from "react-native";
import {DARK_BLUE, MEDIUM_GREY} from "../../../utils/colors";

export const styles = StyleSheet.create({
    textContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "92%",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 24,
        color: DARK_BLUE
    },
    seeAll: {
        fontSize: 15,
        fontFamily: "Poppins_500Medium",
        color: MEDIUM_GREY
    },
    goalsSection: {
        width: "90%",
        height: 155,
        marginBottom: 30,
    },
    goalCardsContainer: {
        height: 130,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
