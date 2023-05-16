import {
  AZURE,
  BLACK,
  QUATERNARY_GREEN,
  QUINARY_GREY,
} from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerCurrentUser: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageBubble: {
    backgroundColor: AZURE,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
  },
  bubbleCurrentUser: {
    backgroundColor: QUATERNARY_GREEN,
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
