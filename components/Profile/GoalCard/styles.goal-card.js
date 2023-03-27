import { StyleSheet } from "react-native";
import {DARK_BLUE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    goalCard: {
        borderRadius: 18,
        width: "48%",
        height: "100%",
        backgroundColor: DARK_BLUE,
        display: "flex",
        justifyContent: "space-around",
        padding: 20
    },
    goalTitle: {
        fontSize: 16,
        color: "#FFFFFF",
        fontFamily: "Poppins_500Medium",
    },
    goalDescription: {
        fontFamily: "Poppins_500Medium",
        color: "#626262",
        fontSize: 12
    },
    progressBar: {
        position: "relative",
        width: "100%",
        height: 17,
        backgroundColor: "#F2F2F2",
        borderRadius: 3,
    },
    progress: {
        width: "20%",
        height: "100%",
        borderRadius: 3,
        backgroundColor: "#BBF246"
    },
    progressText: {
        position: "absolute",
        fontFamily: "Poppins_500Medium",
        width: "100%",
        textAlign: "center",
        fontSize: 12,
        color: DARK_BLUE,
    }
})
