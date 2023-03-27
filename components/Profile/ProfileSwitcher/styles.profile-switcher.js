import { StyleSheet } from "react-native";
import {DARK_BLUE, GREY} from "../../../utils/colors";

export const styles = StyleSheet.create({
    profileSwitcher: {
        width: "85%",
        display: "flex",
        flexDirection: "row",
        gap: 30,
    },
    profileSelected: {
        width: 85,
        height: 35,
        backgroundColor: DARK_BLUE,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    profileUnselected: {
        width: 85,
        height: 35,
        backgroundColor: GREY,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    profileSelectedText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    },
    profileUnselectedText: {
        color: DARK_BLUE,
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    }

});
