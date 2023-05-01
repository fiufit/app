import { StyleSheet } from "react-native";
import {DARK_BLUE, MEDIUM_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    trainingsSection: {
        marginBottom: 30,
        width: "90%",
        height: 210,
        position: "relative",
    },
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
    }
});
