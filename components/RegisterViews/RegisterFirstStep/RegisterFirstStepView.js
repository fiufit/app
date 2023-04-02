import {
  Button,
  Checkbox,
  List,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { React, useState } from "react";

import Background from "../../Background/background";
import { styles } from "./styles.RegisterFirstStepView";

const RegisterFirstStepView = ({ navigation }) => {
  const [expandedList, setExpandedList] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState("false");
  const [checked, setChecked] = useState(false);

  function togglePasswordVisibility() {
    setPasswordIsVisible(!passwordIsVisible);
  }

  function handleRegister() {
    //TO DO
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
        <TouchableRipple style={styles.listAccordion}>
          <List.Accordion
            title={optionSelected ? optionSelected : "Type of User"}
            left={(props) => <List.Icon {...props} icon="account-multiple" />}
            expanded={expandedList}
            onPress={() => setExpandedList(!expandedList)}
            theme={{ colors: { primary: "black" } }}
            style={styles.listAccordionTitle}
          >
            <List.Item
              onPress={() => {
                setOptionSelected("Athlete");
                setExpandedList(!expandedList);
              }}
              title="Athlete"
            />
            <List.Item
              onPress={() => {
                setOptionSelected("Trainer");
                setExpandedList(!expandedList);
              }}
              title="Trainer"
            />
          </List.Accordion>
        </TouchableRipple>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          activeUnderlineColor="#202020"
          left={<TextInput.Icon icon="account" />}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          activeUnderlineColor="#202020"
          left={<TextInput.Icon icon="account" />}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          activeUnderlineColor="#202020"
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
          mode="contained"
          buttonColor="#202020"
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
