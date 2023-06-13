import { StyleSheet } from "react-native";
import {DARK_BLUE, GREEN} from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 15
    },
    numberContainer: {
        position: "relative",
        display: "flex",
        height: 20,
        width: 20,
        backgroundColor: GREEN,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: 'center',
        zIndex: 100,
    },
    number: {
        textAlign: "center",
        fontFamily: 'Lato_400Regular',
        fontSize: 10,
    },
    bar: {
        width: 1,
        backgroundColor: '#000000',
        zIndex: -10
    },
    barContainer: {
        width: 20,
        height: 50,
        bottom: -50,
        position: "absolute",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        fontFamily: 'Lato_300Light',
        width: 210,
    },
    done: {
        borderRadius: 33 / 2,
        borderStyle: 'solid',
        borderColor: DARK_BLUE,
        borderWidth: 1,
        position: "absolute",
        right: 0,
    },
    delete: {
        width: 33,
        height: 33,
        color: 'black'
    }
})
