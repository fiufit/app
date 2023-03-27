import { Text, View } from "react-native";

import React from "react";
import { TextInput } from "react-native-paper";
import { styles } from "./styles.loginView";

const LoginView = () => {
  return (
    <View style={styles.loginBackground}>
      <Text style={styles.greetings}>Hey there,</Text>
      <Text style={styles.welcome}>Welcome Back!</Text>
      <TextInput style={styles.textInput} placeholder="Email"></TextInput>
      <TextInput style={styles.textInput} placeholder="Password"></TextInput>
    </View>
  );
};
export default LoginView;
