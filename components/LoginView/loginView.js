import {Image, ScrollView, Text, TouchableHighlight, View} from "react-native";
import { React, useState } from "react";
import Background from "../Background/background";
import Input from "../Shared/Input/input";
import Button from "../Shared/Button/button";
import MailIcon from '../../assets/images/general/mailIcon.svg'
import LockIcon from '../../assets/images/general/lockIcon.svg'
import LoginIcon from '../../assets/images/general/loginIcon.svg'
import HideEyeIcon from '../../assets/images/general/hideEyeIcon.svg'
import EyeIcon from '../../assets/images/general/eyeIcon.svg'
import { styles } from "./styles.loginView";
import {WHITE} from "../../utils/colors";
import {signInWithGoogle, singIn} from "../../firebase";


const LoginView = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function togglePasswordVisibility() {
    passwordIsVisible
      ? setPasswordIsVisible(false)
      : setPasswordIsVisible(true);
  }

  function handleForgotPassword() {
    //TO DO
  }

  async function handleLogIn() {
    await singIn(email, password);
  }

  async function handleGoogleLogIn() {
    await signInWithGoogle();
  }

  function handleRegister() {
    navigation.navigate({ name: "RegisterFirstStep", merge: true });
  }

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{ flex: 1, alignItems: "center" }}
    >
      <Text style={styles.greetings}>Hey there,</Text>
      <Text style={styles.welcome}>Welcome Back!</Text>
      <Input
          value={email}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          width={"80%"}
          height={48}
          fontSize={12}
          left={<MailIcon height={18} width={18}/>}
      />
      <Input
        style={styles.textInput}
        width={"80%"}
        height={48}
        fontSize={12}
        secureTextEntry={!passwordIsVisible}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        right={
          passwordIsVisible ?
              <HideEyeIcon height={18} width={25} onPress={() => {
                    togglePasswordVisibility();
                }}
              />
              :
              <EyeIcon height={18} width={25} onPress={() => {
                    togglePasswordVisibility();
                }}
              />
        }
        left={<LockIcon height={18} width={18}/>}
      />
      <View style={styles.forgotPasswordContainer}>
        <Text
          onPress={() => handleForgotPassword()}
          style={styles.forgotPasswordText}
        >
          Forgot your password?
        </Text>
      </View>

      <Button
        textColor={WHITE}
        fontSize={16}
        style={styles.loginButton}
        onPress={() => handleLogIn()}
        icon={<LoginIcon/>}
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
