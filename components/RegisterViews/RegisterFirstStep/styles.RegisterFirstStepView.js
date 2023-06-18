import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  greetings: {
    marginTop: 100,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  createAnAccount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    fontFamily: "Poppins_700Bold",
  },
  policies: {
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
    fontSize: 12
  },
  checkboxPolicies: {
    flex: 2,
    flexDirection: "row",
    marginTop: 30,
    marginRight: 10,
  },
  policiesText: {
    paddingTop: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 12
  },
  registerButton: {
    marginTop: 60,
    width: "80%",
    height: 40,
    borderRadius: 10,
  },
  orText: {
    marginTop: 30,
    marginBottom: 30,
    fontFamily: "Poppins_400Regular",
  },
  googleImage: {
    width: 40,
    height: 40,
  },
  alreadyHaveAccountContainer: {
    marginTop: 30,
  },
  alreadyHaveAccountText: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  logIn: {
    color: "#9CB351",
    fontFamily: "Poppins_500Medium",
  },
});
