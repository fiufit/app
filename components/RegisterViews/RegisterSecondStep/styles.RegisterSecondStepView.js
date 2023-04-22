import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logoImage: {
    width: 162,
    height: 102,
    marginTop: 70,
  },
  completeProfileText: {
    marginTop: 50,
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
  helpUsText: {
    fontSize: 12,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
  },
  listAccordion: {
    width: "80%",
    backgroundColor: "#EAEAEA",
    marginTop: 20,
    borderRadius: 15,
  },
  listAccordionTitle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingLeft: 22,
  },
  listAccordionItem: {
    backgroundColor: "#f2f2f2",
  },
  nextButton: {
    marginTop: 50,
    marginBottom: 30,
    height: 40,
    borderRadius: 10,
    width: "80%",
  },
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
