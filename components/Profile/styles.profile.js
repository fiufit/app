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
        top: "8%",
        right: "7%",
        zIndex: 1
    },
    trainingsSection: {
        marginBottom: 30,
        width: "90%",
        height: 210,
        position: "relative",
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "92%",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 24,
        color: DARK_BLUE
    },
    seeAll: {
        fontSize: 15,
        fontFamily: "Poppins_500Medium",
        color: "#727272"
    },
    trainingCard: {
        width: "100%",
        height: 175,
    },
    trainingImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 23,
    },
    goalsSection: {
        width: "90%",
        height: 155,
        marginBottom: 30,
    },
    goalCardsContainer: {
        height: 130,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

});
