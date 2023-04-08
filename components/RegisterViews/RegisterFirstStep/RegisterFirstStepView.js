import { Checkbox, TextInput } from "react-native-paper";
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { React, useState } from "react";

import Background from "../../Background/background";
import Button from "../..//Shared/Button/button";
import Input from "../../Shared/Input/input";
import { WHITE } from "../../../utils/colors";
import { styles } from "./styles.RegisterFirstStepView";

const RegisterFirstStepView = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState("false");
  const [passwordRepeatIsVisible, setPasswordRepeatIsVisible] =
    useState("false");
  const [checked, setChecked] = useState(false);

  function handleRegister() {
    //TO DO
    navigation.navigate({ name: "RegisterSecondStep", merge: true });
  }

  function handleLogIn() {
    //TO DO
  }

  function handleGoogleRegister() {
    //TO DO
  }

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{ flex: 1, alignItems: "center" }}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.greetings}>Hey there,</Text>
        <Text
          onPress={() => navigation.navigate({ name: "Home", merge: true })}
          style={styles.createAnAccount}
        >
          Create an Account
        </Text>
        <Input
          value={email}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          width={"80%"}
          height={55}
          fontSize={14}
          left={<TextInput.Icon icon="email" />}
          backgroundColor={"#FFFFFF"}
        />
        <Input
          value={password}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          width={"80%"}
          height={55}
          fontSize={14}
          backgroundColor={"#FFFFFF"}
          secureTextEntry={!passwordIsVisible}
          right={
            <TextInput.Icon
              onPress={() => {
                setPasswordIsVisible(!passwordIsVisible);
              }}
              icon={passwordIsVisible ? "eye-off" : "eye"}
            />
          }
          left={<TextInput.Icon icon="lock" />}
        />
        <Input
          value={passwordRepeat}
          placeholder="Repeat password"
          onChangeText={(passwordRepeat) => setPasswordRepeat(passwordRepeat)}
          width={"80%"}
          height={55}
          fontSize={14}
          backgroundColor={"#FFFFFF"}
          secureTextEntry={!passwordRepeatIsVisible}
          right={
            <TextInput.Icon
              onPress={() => {
                setPasswordRepeatIsVisible(!passwordRepeatIsVisible);
              }}
              icon={passwordRepeatIsVisible ? "eye-off" : "eye"}
            />
          }
          left={<TextInput.Icon icon="lock" />}
        />
        <View style={styles.checkboxPolicies}>
          <Checkbox
            color="black"
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.policiesText}>
            By continuing you accept our{" "}
            <Text style={styles.policies}>Privacy Policy</Text> and
          </Text>
        </View>
        <Text style={styles.policies}>Terms of Use</Text>
        <Button
          textColor={WHITE}
          fontSize={16}
          style={styles.registerButton}
          onPress={() => handleRegister()}
        >
          Register
        </Button>
        <Text style={styles.orText}>Or</Text>
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={() => handleGoogleRegister()}
        >
          <Image
            style={styles.googleImage}
            source={require("../../../assets/googleIcon.png")}
          />
        </TouchableHighlight>
        <View style={styles.alreadyHaveAccountContainer}>
          <Text style={styles.alreadyHaveAccountText}>
            Already have an account?{" "}
            <Text onPress={() => handleLogIn()} style={styles.logIn}>
              Login
            </Text>{" "}
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
};

export default RegisterFirstStepView;
