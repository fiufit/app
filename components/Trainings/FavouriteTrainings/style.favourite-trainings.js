import { StyleSheet } from "react-native";
import {LIGHT_GREY, MEDIUM_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        width: "90%",
        // height: 220,
        display: "flex",
        gap: 10,
        marginBottom: 15
    },
    title: {
        fontFamily: "Lato_700Bold",
        fontSize: 18,
    },
    loadingCardTitle: {
        width: 200,
        height: 18,
        borderRadius: 6,
        backgroundColor: LIGHT_GREY
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
    loadingTrainingCard: {
        width: 200,
        height: 86,
        borderRadius: 9,
        backgroundColor: LIGHT_GREY,
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
    loadingImage: {
        width: 72,
        aspectRatio: 1,
        borderRadius: 6,
        marginLeft: 8,
        backgroundColor: LIGHT_GREY
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
        color: '#192126',
        width: 100
    },
    loadingTitle: {
        width: 100,
        height: 15,
        backgroundColor: LIGHT_GREY,
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
    trainingDetailLoading: {
        backgroundColor: LIGHT_GREY,
        paddingVertical: 2,
        borderRadius: 3,
        fontFamily: 'Lato_400Regular',
        fontSize: 12,
        color: '#192126',
        width: 70,
    },
    detailsContainer: {
        display: 'flex',
        gap: 5,
    }
});
