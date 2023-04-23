import { StyleSheet } from "react-native";
import {WHITE} from "../../../../utils/colors";
import {Lato_400Regular} from "@expo-google-fonts/lato";
const profilePictureDimention = 100;

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
        height: 300,
        padding: "10%",
        backgroundColor: WHITE,
        borderRadius: 15,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    iconsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%"
    },
    button: {
        width: "100%",
        height: 40,
        borderRadius: 15
    },
    or: {
        fontFamily: "Lato_400Regular"
    },
    image: {
        width: profilePictureDimention,
        height: profilePictureDimention,
        borderRadius: profilePictureDimention / 2,
        resizeMode: 'cover'
    }
});
