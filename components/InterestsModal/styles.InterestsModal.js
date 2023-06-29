import {BLACK, SECONDARY_WHITE, WHITE} from "../../utils/colors";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  interestsModal: {
    width: "90%",
    height: "auto",
    borderRadius: 20,
    alignSelf: "center",
  },
  modalContent: {
    height: 300,
    marginBottom: "auto",
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: WHITE
  },
  interestsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
    width: "80%",
  },
  interestChip: {
    width: "45%",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: SECONDARY_WHITE,
    margin: 4,
  },
  interestText: {
    textAlign: "center",
    fontSize: 14,
    color: BLACK,
    fontFamily: "Poppins_500Medium",
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    width: "80%",
    textAlign: "center",
    color: BLACK,
  }
});
