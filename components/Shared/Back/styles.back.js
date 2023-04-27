import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    back: {
        position: "absolute",
        top: "5%",
        left: "7%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        zIndex: 100
    },
    text: {
        fontFamily: "Lato_400Regular",
        fontSize: 15
    }
});
