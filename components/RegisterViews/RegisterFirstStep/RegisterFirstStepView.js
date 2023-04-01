import { Text, View } from "react-native";

import { React } from "react";
import { styles } from "./styles.RegisterFirstStepView";

const RegisterFirstStepView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.greetings}>Hey there,</Text>
      <Text
        onPress={() => navigation.navigate({ name: "Home", merge: true })}
        style={styles.welcome}
      >
        First step.
      </Text>
    </View>
  );
};

export default RegisterFirstStepView;
