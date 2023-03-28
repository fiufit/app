import { Button, TextInput } from "react-native-paper";

import Background from "../Background/background";
import React from "react";
import { Text } from "react-native";
import { styles } from "./styles.loginView";

const LoginView = () => {
  return (
    <Background>
      <Text style={styles.greetings}>Hey there,</Text>
      <Text style={styles.welcome}>Welcome Back!</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        left={<TextInput.Icon icon="email" />}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        right={<TextInput.Icon icon="eye" />}
      ></TextInput>
      <Button
        icon="login"
        mode="contained"
        style={styles.loginButton}
        onPress={() => console.log("Pressed")}
      >
        Log In
      </Button>
    </Background>
  );
};
export default LoginView;
