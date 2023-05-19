import { StyleSheet } from "react-native";
import {WHITE} from "../../../../utils/colors";

export const styles = StyleSheet.create({
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 20,
        color: "black",
        textAlign: "center",
    },
    modalContainer: {
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.34)",
        height: "100%",
        width: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        width: "90%",
        height: 400,
        padding: "10%",
        backgroundColor: WHITE,
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    button: {
        width: "100%",
        height: 40,
        borderRadius: 15,
        marginTop: 20
    },
    starsContainer: {
        display: "flex",
        flexDirection: "row",
    }
});
