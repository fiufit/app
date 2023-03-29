import { Button, TextInput } from "react-native-paper";
import { Image, Text, View } from "react-native";

import Background from "../Background/background";
import React from "react";
import { styles } from "./styles.loginView";

const LoginView = () => {
  return (
    <Background>
      <Text style={styles.greetings}>Hey there,</Text>
      <Text style={styles.welcome}>Welcome Back!</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        activeUnderlineColor="#202020"
        left={<TextInput.Icon icon="email" />}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        activeUnderlineColor="#202020"
        placeholder="Password"
        right={<TextInput.Icon icon="eye" />}
        left={<TextInput.Icon icon="lock" />}
      ></TextInput>
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </View>
      <Button
        icon="login"
        mode="contained"
        buttonColor="#202020"
        style={styles.loginButton}
        onPress={() => console.log("Pressed")}
      >
        Log In
      </Button>
      <Text style={styles.orText}>Or</Text>
      <Image
        style={styles.googleImage}
        source={require("../../assets/googleIcon.png")}
      />
      <View style={styles.doNotHaveAccountContainer}>
        <Text style={styles.doNotHaveAccountText}>
          Don't have an account yet?{" "}
          <Text style={styles.register}>Register</Text>{" "}
        </Text>
      </View>
    </Background>
  );
};
export default LoginView;
