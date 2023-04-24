import { DARK_GREY } from "../../../../utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  errorModal: {
    width: "87%",
    height: "auto",
    borderRadius: 20,
    alignSelf: "center",
  },
  modalContent: {
    marginBottom: "auto",
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    paddingHorizontal: 4,
    color: DARK_GREY,
  },
});
