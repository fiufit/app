import { Text, View } from "react-native";

import { React } from "react";
import { styles } from "./styles.RegisterSecondStepView";

const RegisterSecondStepView = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.greetings}>Hey there,</Text>
      <Text style={styles.welcome}>Second step.</Text>
    </View>
  );
};

export default RegisterSecondStepView;
