import { BLACK, QUATERNARY_GREY } from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  conversationHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: QUATERNARY_GREY,
  },
  backButton: {
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: BLACK,
    fontFamily: "Lato_400Regular",
  },
});
