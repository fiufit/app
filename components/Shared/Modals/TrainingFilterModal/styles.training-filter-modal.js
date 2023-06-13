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
        position: "relative",
        width: "90%",
        height: 400,
        padding: "10%",
        backgroundColor: WHITE,
        borderRadius: 15,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        rowGap: 10
    },
    button: {
        width: "45%",
        padding: 4,
        borderRadius: 15
    }
});
