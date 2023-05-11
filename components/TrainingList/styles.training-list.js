import { StyleSheet } from "react-native";
import { GREY, WHITE } from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: GREY,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    marginTop: "25%",
    width: "80%",
    marginBottom: 10
  },
  trainingsContainer: {
    width: "90%",
  },
  trainingCard: {
    width: "90%",
    height: 86,
    borderRadius: 9,
    backgroundColor: WHITE,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  trainingImage: {
    width: 72,
    aspectRatio: 1,
    borderRadius: 6,
    marginLeft: 8,
  },
  trainingTitle: {
    fontSize: 14,
    fontFamily: "Lato_700Bold",
    color: "#192126",
  },
  trainingDetail: {
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    color: "#192126",
  },
  detailsContainer: {
    display: "flex",
    gap: 5,
  },
  infoContainer: {
    height: 72,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    height: 45,
    bottom: 40,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
  },
  createButton: {
    height: "100%",
    borderRadius: 10,
    width: '85%',
  }
});
