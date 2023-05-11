import { StyleSheet } from "react-native";
import {DARK_BLUE, GREEN, LIGHT_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 150,
        borderRadius: 23,
        display: "flex",
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    title: {
        color: DARK_BLUE,
        fontFamily: "Lato_400Regular",
        fontSize: 24,
        width: "80%",
        textAlign: 'center'
    },
    callToAction: {
        width: '40%',
        borderRadius: 12,
        height: 30,
    },
});
