import { StyleSheet } from "react-native";
import { WHITE } from "../../utils/colors";

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
    paddingTop: 10,
    flex: 1,
  },
});
