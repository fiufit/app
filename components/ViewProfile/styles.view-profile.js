import { StyleSheet } from "react-native";
import {DARK_BLUE, GREY} from "../../utils/colors";

export const styles = StyleSheet.create({
    scrollView: {
        width: "90%",
    },
    container: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 20,
        paddingTop: 70,
        backgroundColor: GREY,
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        justifyContent: "space-between",
    },
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 24,
        color: DARK_BLUE
    },
});
