import {
  AZURE,
  BLACK,
  QUATERNARY_GREEN,
  QUINARY_GREY,
} from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerCurrentUser: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  messageContainer: {
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
    backgroundColor: QUATERNARY_GREEN,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
  },
  bubbleCurrentUser: {
    backgroundColor: AZURE,
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
