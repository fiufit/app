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
        marginTop: 15,
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
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        width: '90%',
        gap: 10,
        height: 30
    },
    button: {
        width: '40%',
        borderRadius: 5
    }
});
