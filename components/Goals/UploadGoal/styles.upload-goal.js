import { StyleSheet } from "react-native";
import { GREY, WHITE } from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: WHITE,
        position: "relative",
        display: "flex",
        gap: 20
    },
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 22,
        width: "80%",
        marginBottom: 10
    },
    subTitle: {
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
        width: "80%",
    },
    buttonsContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    categoryButton: {
        width: "30%",
        borderRadius: 10
    },
    inputContainer: {
        width: "80%",
    },
    buttonContainer: {
        width: "100%",
        height: 45,
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
