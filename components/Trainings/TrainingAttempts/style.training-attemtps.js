import { StyleSheet } from "react-native";
import {DARK_BLUE, GREEN, MEDIUM_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        width: "90%",
        // height: 220,
        display: "flex",
        gap: 10,
    },
    title: {
        fontFamily: "Lato_700Bold",
        fontSize: 18,
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        width: "96%",
        alignItems: 'flex-end',
        justifyContent: "space-between",
    },
    seeAll: {
        fontSize: 13.5,
        fontFamily: "Lato_700Bold",
        color: MEDIUM_GREY
    },
    trainingsContainer: {
        display: "flex",
        flexDirection: "column",
    },
    attemptCard: {
        width: "100%",
        height: 100,
        borderRadius: 23,
        backgroundColor: WHITE,
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15,
        marginBottom: 15,
        position: "relative"
    },
    cardColumn: {
        display: "flex",
        gap: 10,
        marginRight: 15,
    },
    trainingImage: {
        width: 80,
        aspectRatio: 1,
        borderRadius: 6,
        marginLeft: 12
    },
    infoContainer: {
        height: 72,
        display: 'flex',
        alignItems: "flex-start",
        width: "60%",

    },
    trainingTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: '#192126',
    },
    trainingDetail: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
        color: '#192126',
        marginBottom: 5

    },
    progressBar: {
        position: "relative",
        width: "100%",
        height: 17,
        backgroundColor: "#F2F2F2",
        borderRadius: 3,
    },
    progress: {
        width: "20%",
        height: "100%",
        borderRadius: 3,
        backgroundColor: GREEN
    },
    progressText: {
        position: "absolute",
        fontFamily: "Poppins_500Medium",
        width: "100%",
        textAlign: "center",
        fontSize: 12,
        color: DARK_BLUE,
    },
    difficulty: {
        position: "absolute",
        right: "6%",
        top: 0,
        backgroundColor: DARK_BLUE,
        color: WHITE,
        paddingVertical: 1.5,
        paddingHorizontal: 8,
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    }
});
