import { GREY, WHITE } from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  conversationContainer: {
    flex: 1,
  },
  conversationHeaderContainer: {
    marginTop: 40,
  },
  messageListContainer: {
    flex: 1,
  },
  messageList: {
    backgroundColor: WHITE,
    flex: 1,
  },
  messageInputContainer: {
    backgroundColor: GREY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
