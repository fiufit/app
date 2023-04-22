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
    backgroundColor: "#F2F2F2",
    margin: 4,
  },
  interestText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Poppins_500Medium",
  },
  modalTitle: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    color: "#000",
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
