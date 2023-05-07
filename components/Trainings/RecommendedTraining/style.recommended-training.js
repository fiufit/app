import {StyleSheet} from "react-native";
import {GREEN, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    trainingCard: {
        width: "90%",
        height: 180,
        position: "relative",
        borderRadius: 15,
        marginBottom: 30
    },
    filter: {
        backgroundColor: "rgba(0,0,0,0.37)",
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 15,
    },
    trainingImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 15,
    },
    recommendTitle: {
        position: "absolute",
        color: WHITE,
        fontFamily: "Lato_700Bold",
        fontSize: 24,
        width: 180,
        left: "8%",
        top: "12%"
    },
    seeMoreContainer: {
        position: "absolute",
        bottom: "10%",
        right: "8%",
        display: "flex",
        width: 70,
        height: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    seeMore: {
        fontFamily: "Lato_700Bold",
        fontSize: 14,
        color: GREEN
    },
});
