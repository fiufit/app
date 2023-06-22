import { DARK_BLUE, DARK_GREY, LIGHT_GREY, WHITE } from "../../../utils/colors";

import { StyleSheet } from "react-native";

const profilePictureDimention = 120;
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: WHITE,
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: "20%",
  },
  profilePictureContainer: {
    position: "relative",
    width: profilePictureDimention,
    height: profilePictureDimention,
    borderRadius: profilePictureDimention / 2,
    backgroundColor: LIGHT_GREY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6%",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: profilePictureDimention / 2,
    resizeMode: "cover",
  },
  editIcon: {
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  name: {
    fontFamily: "Poppins_500Medium",
    fontSize: 25,
    marginTop: "5%",
  },
  nickName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: DARK_GREY,
  },
  data: {
    height: "40%",
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    width: "80%",
    height: 45,
    borderRadius: 15,
    marginTop: "15%",
  },
  dataCard: {
    backgroundColor: DARK_BLUE,
    width: "45%",
    height: "40%",
    borderRadius: 15,
  },
});
