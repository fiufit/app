import { StyleSheet } from "react-native";
import {
  DARK_BLUE,
  GREEN,
  GREY,
  LIGHT_GREY,
  MEDIUM_GREY,
  SECONDARY_WHITE,
  TRANSPARENT_GREY,
  WHITE,
} from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: GREY,
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
  },
  title:{
    fontFamily: "Poppins_600SemiBold",
    width: "80%",
    color: DARK_BLUE,
    fontSize: 20,
    marginBottom: 20,
  },
  notificationCard: {
    width: "85%",
    height: 75,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  notificationImageContainer: {
    backgroundColor: GREY,
    borderRadius: 35,
    height: 70,
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  notificationText: {
    width: "80%",
    display: "flex",
  },
  notificationBody: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    width: "95%",
  },
  callToActionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  callToActionText: {
    paddingTop: 2.5,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: MEDIUM_GREY,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GREEN,
  },
});
