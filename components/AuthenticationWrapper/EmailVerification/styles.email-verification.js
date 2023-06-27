import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    topContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 10,
        marginTop: "30%",
    },
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 15
    },
    verifyButton: {
        height: 40,
        borderRadius: 10,
        width: "100%",
    },
    optionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "80%",

    },
    optionButton: {
        height: 30,
        width: "40%",
        borderRadius: 10,
    },
    mailOptionContainer:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "80%",
        gap: 20,
        height: "30%",

    },
    whatsappOptionContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "70%",
        gap: 10,
        height: "30%",
    },
    whatsappOptionTitle: {
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
        alignSelf: "flex-start",
        paddingHorizontal: 20
    }
});
