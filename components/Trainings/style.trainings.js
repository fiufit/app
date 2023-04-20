import { StyleSheet } from "react-native";
import {DARK_BLUE, GREY} from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        flex: 1,
        alignItems: "center",
        gap: 20,
        paddingTop: 70,
        backgroundColor: GREY,
    },
    inputAndButtonContainer: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "space-between"
    },
    addButton: {
        width: "15%",
        height: 48,
        borderRadius: 8
    }
});
