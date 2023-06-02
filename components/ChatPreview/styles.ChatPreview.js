import {
  AZURE,
  BLACK,
  QUATERNARY_GREY,
  TERCIARY_GREY,
  WHITE,
} from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chatPreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: TERCIARY_GREY,
  },
  chatPreviewContainerWithUnreadMessage: {
    backgroundColor: AZURE,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageTextContainer: {
    flex: 1,
  },
  textName: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginBottom: 4,
  },
  lastMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lastMessageSender: {
    fontSize: 14,
    color: BLACK,
    fontFamily: "Poppins_500Medium",
  },
  lastMessage: {
    fontSize: 14,
    color: QUATERNARY_GREY,
    fontFamily: "Lato_400Regular",
  },
  lastMessageTime: {
    fontSize: 12,
    color: QUATERNARY_GREY,
    marginLeft: 16,
    fontFamily: "Lato_400Regular",
  },
  unreadMessage: {
    fontFamily: "Poppins_700Bold",
    color: BLACK,
  },
});
