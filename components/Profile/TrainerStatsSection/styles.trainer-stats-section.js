import { StyleSheet } from "react-native";
import {DARK_BLUE, MEDIUM_GREY, WHITE} from "../../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: "90%",
    height: 210,
    position: "relative",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    color: DARK_BLUE
  },
  seeAll: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: MEDIUM_GREY
  },
  statsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-around",

  },
  stat: {
    // width: "100%",
    // height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 30,

  },
  statValue: {
    paddingTop: 6,
    fontSize: 22,
    fontFamily: 'Poppins_500Medium',
    color: DARK_BLUE,
    marginLeft: 30,
    minWidth: 40
  },
  statTitle: {
    paddingTop: 6,
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: DARK_BLUE,
    marginLeft: 10
  },
  statDetail: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: DARK_BLUE,
    width: "95%",
    textAlign: "right",
  }
});
