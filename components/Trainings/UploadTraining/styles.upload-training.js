import { StyleSheet } from "react-native";
import {SECONDARY_GREY, WHITE} from "../../../utils/colors";

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
    createButton: {
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

    }
})
