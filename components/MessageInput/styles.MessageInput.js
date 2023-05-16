import { BLUE, GREY } from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: GREY,
    paddingHorizontal: 10,
  },
  messageInput: {
    flex: 1,
    paddingVertical: 8,
  },
  messageSendButton: {
    backgroundColor: BLUE,
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});
