import { StyleSheet } from "react-native";
import {DARK_BLUE, GREY} from "../../utils/colors";

export const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
    },
    container: {
        position: "relative",
        display: "flex",
        flex: 1,
        alignItems: "center",
        gap: 20,
        paddingTop: 70,
        backgroundColor: GREY,
    },
    menuButton: {
        position: "absolute",
        top: "12%",
        right: "7%",
        zIndex: 1
    }
});
