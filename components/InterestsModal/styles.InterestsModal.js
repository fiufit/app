import { BLACK, SECONDARY_WHITE } from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  interestsModal: {
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
  interestsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  interestChip: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: SECONDARY_WHITE,
    margin: 4,
  },
  interestText: {
    fontSize: 14,
    color: BLACK,
    fontFamily: "Poppins_500Medium",
  },
  modalTitle: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    paddingHorizontal: 4,
    color: BLACK,
  },
  closeButton: {
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: "auto",
    marginRight: 30,
    marginTop: 20,
    marginBottom: 5,
  },
});
