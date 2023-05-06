import { StyleSheet } from "react-native";
import {LIGHT_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    trainingCard: {
        width: "100%",
        height: 175,
        position: "relative",
        backgroundColor: LIGHT_GREY,
        borderRadius: 23,
    },
    trainingImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 23,
    },
    filter: {
        backgroundColor: "rgba(0,0,0,0.37)",
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 23,
    },
    trainingTitle: {
        position: "absolute",
        color: WHITE,
        fontFamily: "Lato_700Bold",
        fontSize: 24,
        width: "80%",
        left: "10%",
        top: "10%"
    },
    loadingTitle: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        position: "absolute",
        top: "10%",
        left: "10%",
        height: 20,
        width: 150,
        borderRadius: 10
    },
    trainingDurationContainer: {
        width: 85,
        height: 26,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        bottom: "12%",
        left: "10%",
        borderRadius: 9,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5
    },
    trainingDurationText: {
        fontFamily: "Lato_400Regular",
        fontSize: 12
    },
    trainingDifficultyContainer: {
        width: 85,
        height: 26,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        bottom: "30%",
        left: "10%",
        borderRadius: 9,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5
    },
    trainingDifficultyText: {
        fontFamily: "Lato_400Regular",
        fontSize: 12
    },
});
