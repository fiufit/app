import { BLACK, GREY, QUINARY_GREY, SECONDARY_GREY } from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  containerCurrentUser: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageBubble: {
    backgroundColor: GREY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
  },
  bubbleCurrentUser: {
    backgroundColor: SECONDARY_GREY,
  },
  message: {
    fontSize: 16,
    color: BLACK,
    fontFamily: "Lato_400Regular",
  },
  timestamp: {
    fontSize: 12,
    color: QUINARY_GREY,
    marginTop: 5,
    textAlign: "right",
    fontFamily: "Lato_400Regular",
  },
});
