import { StyleSheet } from "react-native";
import {DARK_BLUE, SECONDARY_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        gap: -60
    },
    imageContainer: {
        width: "100%",
        height: "45%",
        backgroundColor: SECONDARY_GREY
    },
    addImageContainer: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        gap: 15
    },
    addImageText: {
        fontSize: 23,
        color: "#464646",
        fontFamily: 'Poppins_500Medium'
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover'
    },
    infoContainer: {
        backgroundColor: WHITE,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 40
    },
    titleAndIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        marginBottom: 10
    },
    title: {
        fontSize: 25,
        fontFamily: 'Lato_700Bold'
    },
    detail: {
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
        flexDirection: 'row',
        gap: 6,
        marginBottom: 20
    },
    start: {
        fontSize: 18,
        fontFamily: 'Lato_400Regular',
        marginBottom: 20
    },
    exercisesContainer: {
        display: 'flex',
        gap: 10,
    },
    startButton: {
        height: "100%",
        borderRadius: 10,
        width: '80%',
    },
    buttonContainer: {
        position: "absolute",
        width: "100%",
        height: 40,
        bottom: 40,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    ratingContainer: {
        position: "absolute",
        top: 50,
        right: "5%",
        width: 60,
        height: 25,
        borderRadius: 5,
        backgroundColor: DARK_BLUE,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        gap: 5
    },
    rating: {
        fontSize: 15,
        color: WHITE,
        fontFamily: 'Lato_400Regular',
    },
    tagsContainer: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 10,
        width: "70%"
    },
    tag: {
        backgroundColor: DARK_BLUE,
        color: WHITE,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontFamily: 'Lato_400Regular',
        fontSize: 12,
        height: 18,
        minWidth: 20,
    }
})
