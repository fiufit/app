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
    height: "80%",
  },
  messageList: {
    backgroundColor: WHITE,
    height: "100%",
    flex: 1,
  },
  messageInputContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: GREY,
  },
});
