import { StyleSheet } from "react-native";
import { GREY, WHITE } from "../../../utils/colors";

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
    goalsContainer: {
        width: "90%",
    },
    buttonContainer: {
        position: "absolute",
        width: "100%",
        height: 45,
        bottom: 40,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    createButton: {
        height: "100%",
        borderRadius: 10,
        width: '85%',
    }
});
