import { StyleSheet } from "react-native";
import {GREY} from "../../utils/colors";

export const styles = StyleSheet.create({
  messagingViewContainer: {
    alignItems: "center",
    height: "100%",
    backgroundColor: GREY,
  },
  scrollContainer:{
    width: "100%",
    height: "67%",
  },
  chatPreviewList: {
    width: "100%",
    height: "100%",
  },
  messagingTopBarContainer: {
    width: "80%",
    paddingTop: 40,
    marginTop: 10,
  },
  chatPreviewContainer: {
    width: "100%",
  },
  usersSearchBar: {
    marginBottom: 15,
  },
  conversationLoader: {
    marginBottom: 15,
  },
});
