import { StyleSheet } from "react-native";
import {MEDIUM_GREY, WHITE} from "../../../utils/colors";

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
        flexDirection: "row",
    },
    trainingCard: {
        width: 200,
        height: 86,
        borderRadius: 9,
        backgroundColor: WHITE,
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    cardColumn: {
        display: "flex",
        gap: 10,
        marginRight: 15,
    },
    trainingImage: {
        width: 72,
        aspectRatio: 1,
        borderRadius: 6,
        marginLeft: 8
    },
    infoContainer: {
        height: 72,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "flex-start"
    },
    trainingTitle: {
        fontSize: 14,
        fontFamily: 'Lato_700Bold',
        color: '#192126'
    },
    trainingDetail: {
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontFamily: 'Lato_400Regular',
        fontSize: 12,
        color: '#192126'
    },
    detailsContainer: {
        display: 'flex',
        gap: 5,
    }
});
