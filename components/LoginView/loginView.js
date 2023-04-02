import { Button, TextInput } from "react-native-paper";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { React, useState } from "react";

import Background from "../Background/background";
import { styles } from "./styles.loginView";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState("false");

  function togglePasswordVisibility() {
    passwordIsVisible
      ? setPasswordIsVisible(false)
      : setPasswordIsVisible(true);
  }

  function handleForgotPassword() {
    //TO DO
  }

  function handleLogIn() {
    //TO DO
  }

  function handleGoogleLogIn() {
    //TO DO
  }

  function handleRegister() {
    //TO DO
  }

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{ flex: 1, alignItems: "center" }}
    >
      <Text style={styles.greetings}>Hey there,</Text>
      <Text style={styles.welcome}>Welcome Back!</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        activeUnderlineColor="#202020"
        value={email}
        onChangeText={(email) => setEmail(email)}
        left={<TextInput.Icon icon="email" />}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        activeUnderlineColor="#202020"
        secureTextEntry={!passwordIsVisible}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        right={
          <TextInput.Icon
            onPress={() => {
              togglePasswordVisibility();
            }}
            icon={passwordIsVisible ? "eye-off" : "eye"}
          />
        }
        left={<TextInput.Icon icon="lock" />}
      ></TextInput>
      <View style={styles.forgotPasswordContainer}>
        <Text
          onPress={() => handleForgotPassword()}
          style={styles.forgotPasswordText}
        >
          Forgot your password?
        </Text>
      </View>
      <Button
        icon="login"
        mode="contained"
        buttonColor="#202020"
        style={styles.loginButton}
        onPress={() => handleLogIn()}
      >
        Log In
      </Button>
      <Text style={styles.orText}>Or</Text>
      <TouchableHighlight
        underlayColor={"transparent"}
        onPress={() => handleGoogleLogIn()}
      >
        <Image
          style={styles.googleImage}
          source={require("../../assets/googleIcon.png")}
        />
      </TouchableHighlight>
      <View style={styles.doNotHaveAccountContainer}>
        <Text style={styles.doNotHaveAccountText}>
          Don't have an account yet?{" "}
          <Text onPress={() => handleRegister()} style={styles.register}>
            Register
          </Text>{" "}
        </Text>
      </View>
    </Background>
  );
};
export default LoginView;
