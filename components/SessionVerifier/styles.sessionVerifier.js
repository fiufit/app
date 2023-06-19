import { BLUE } from "../../utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  greetings: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  welcome: {
    fontSize: 20,
    marginBottom: 40,
    fontFamily: "Poppins_700Bold",
  },
  biometrics: {
    marginTop: 40,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  incorrectUser: {
    marginTop: 60,
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  loginText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    color: BLUE,
  },
  lockedCellphone: {
    height: 200,
    width: 200,
    marginTop: 130,
  },
  faceId: {
    height: 50,
    width: 50,
    marginTop: 50,
  },
});
