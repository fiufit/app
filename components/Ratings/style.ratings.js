import {StyleSheet} from "react-native";
import {DARK_BLUE, DARK_GREY, GREEN, GREY, LIGHT_GREY, WHITE} from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: GREY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontFamily: 'Lato_400Regular',
    },
    subtitle: {
      fontSize: 15,
      fontFamily: 'Lato_400Regular',
      color: DARK_GREY,
    },
    ratingContainer: {
        width: "80%",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    rating: {
        paddingTop: 15,
        fontSize: 70,
        fontFamily: 'Poppins_400Regular',
        color: DARK_BLUE
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
    rateButton: {
        height: "100%",
        borderRadius: 10,
        width: '80%',
    },
    ratingsContainer: {
        display: 'flex',
    },
    ratingCard: {
        width: '100%',
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: LIGHT_GREY,
        resizeMode: 'cover',
    },
    loadingPicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: LIGHT_GREY,
    },
    loadingName: {
        height: 10,
        width: 80,
        backgroundColor: LIGHT_GREY,
        borderRadius: 10,
        marginBottom: 5
    },
    loadingRating: {
        height: 10,
        backgroundColor: LIGHT_GREY,
        borderRadius: 10,
        fontSize: 15,
        width: '100%',
        marginBottom: 10,
    },
    loadingRatingLast: {
        height: 10,
        backgroundColor: LIGHT_GREY,
        borderRadius: 10,
        fontSize: 15,
        width: '100%',
        marginBottom: 25,
    },
    nickname: {
        fontFamily: "Lato_700Bold",
    },
    name: {
        fontFamily: "Lato_400Regular",
        color: DARK_BLUE,
        fontSize: 20
    },
    starsContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    ratingText: {
        fontFamily: "Lato_400Regular",
        fontSize: 15,
        width: '100%',
        marginBottom: 25,
    },
    starsAndTextContainer: {
        backgroundColor: WHITE,
        width: '80%',
        paddingHorizontal: 25,
        borderRadius: 15
    }
});
