import { StyleSheet } from "react-native";
import {DARK_BLUE} from "../../utils/colors";

export const styles = StyleSheet.create({
    tabBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: DARK_BLUE,
        position: "absolute",
        bottom: 16,
        height: 63,
        right: "5%",
        borderRadius: 24,
        width: "90%",
        shadowColor: "#000000",
        shadowOffset: { width: 20, height: 0 },
        shadowOpacity: 0.25,
        elevation: 20
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "10%",
    },
})
