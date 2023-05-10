import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  successModal: {
    width: "87%",
    height: "57%",
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 20,
  },
  greenHalf: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  whiteHalf: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Poppins_700Bold",
  },
  successDescription: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: "auto",
  },
  closeButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
});
