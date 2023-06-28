import AuthenticationController from "../../../utils/controllers/AuthenticationController";
import Background from "../../Background/background";
import Button from "../../Shared/Button/button";
import ErrorModal from "../../Shared/Modals/ErrorModal/ErrorModal";
import SuccessModal from "../../Shared/Modals/SuccessModal/SuccessModal";
import { Text, View } from "react-native";
import { BLACK, DARK_BLUE, WHITE } from "../../../utils/colors";
import { styles } from "./styles.email-verification";
import { useState } from "react";
import LogOutButton from "../../Shared/LogOutButton/logOutButton";
import Input from "../../Shared/Input/input";
import PhoneIcon from "../../../assets/images/general/phone-portrait-outline.svg";
import LockIcon from "../../../assets/images/general/lockIcon.svg";

const EmailVerification = ({ user }) => {
  const [errorModalIsVisible, setErrorModalIsVisible] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [successModalIsVisible, setSuccessModalIsVisible] = useState(false);
  const [successDescription, setSuccessDescription] = useState("");
  const [mailOptionSelected, setMailOptionSelected] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("+549");
  const [pin, setPin] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [pinError, setPinError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSendVerifyLink = async () => {
    const controller = new AuthenticationController(user);
    const { email } = await controller.sendVerificationMail();
    if (email) {
      setSuccessModalIsVisible(true);
      setSuccessDescription(`Mail sent to: ${email}`);
    } else {
      setErrorModalIsVisible(true);
      setErrorDescription(
        `We already sent a mail to your email, check spam or come back later.`
      );
    }
  };

  const handleAlreadyVerify = async () => {
    await user.reload();
    await user.getIdToken(true);
  };

  const handleSendVerifyPin = async () => {
    if(!phoneNumber){
        setPhoneError("Please enter a phone number");
        return;
    }

    if (phoneNumber && !sending) {
      setSending(true);
      const controller = new AuthenticationController(user);
      const { data, error } = await controller.sendVerificationPin(phoneNumber);
      console.log(data);
      if (error) {
        setErrorModalIsVisible(true);
        setErrorDescription(
          "There was an error sending the pin, please verify your number and try again."
        );
      }
      setSending(false);
    }
  };

  const handleVerifyPin = async () => {
    if(!pin){
        setPinError("Please enter a pin");
        return;
    }
    if(pin && !verifying){
      setVerifying(true)
      const controller = new AuthenticationController(user);
      const { data, error } = await controller.verifyPin(pin);
      console.log(data);
      if (error) {
        console.log(error);
        setErrorModalIsVisible(true);
        setErrorDescription(
            "There was an error verifying the pin, please verify it and try again."
        );
      } else {
        await handleAlreadyVerify();
      }
      setVerifying(false)
    }
  };

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        gap: 80,
      }}
    >
      <LogOutButton />
      <View style={styles.topContainer}>
        <Text style={styles.title}>Please, verify your account</Text>
        <View style={styles.optionContainer}>
          <Button
            textColor={mailOptionSelected ? WHITE : DARK_BLUE}
            buttonColor={mailOptionSelected ? DARK_BLUE : "transparent"}
            style={styles.optionButton}
            onPress={() => setMailOptionSelected(true)}
          >
            by email
          </Button>
          <Button
            textColor={!mailOptionSelected ? WHITE : DARK_BLUE}
            buttonColor={!mailOptionSelected ? DARK_BLUE : "transparent"}
            style={styles.optionButton}
            onPress={() => setMailOptionSelected(false)}
          >
            by whastapp
          </Button>
        </View>
      </View>
      {mailOptionSelected ? (
        <View style={styles.mailOptionContainer}>
          <Button
            textColor={WHITE}
            fontSize={16}
            style={styles.verifyButton}
            onPress={handleSendVerifyLink}
          >
            Resend verification link
          </Button>
          <Button
            textColor={WHITE}
            fontSize={16}
            style={styles.verifyButton}
            onPress={handleAlreadyVerify}
          >
            I already verified my email
          </Button>
        </View>
      ) : (
        <View style={styles.whatsappOptionContainer}>
          <Text style={styles.whatsappOptionTitle}>
            Enter your phone number
          </Text>
          <Input
            onChangeText={(text) => {
              setPhoneError("");
              setPhoneNumber(text);
            }}
            placeholder={phoneError ? phoneError : "Phone number"}
            width={"100%"}
            height={40}
            value={phoneNumber}
            marginTop={0}
            left={<PhoneIcon width={30} height={20} color={BLACK} />}
            placeholderTextColor={phoneError ? "red" : null}
          />
          <Button
            onPress={handleSendVerifyPin}
            textColor={WHITE}
            fontSize={16}
            style={styles.verifyButton}
          >
            {sending ? "Sending..." : "Send verification PIN"}
          </Button>
          <Input
            placeholder={pinError ? pinError : "PIN"}
            width={"100%"}
            height={40}
            marginTop={40}
            left={<LockIcon color={BLACK} />}
            onChangeText={(text) => {
              setPinError("");
              setPin(text);
            }}
            value={pin}
            placeholderTextColor={pinError ? "red" : null}
          />
          <Button
            textColor={WHITE}
            fontSize={16}
            style={styles.verifyButton}
            onPress={handleVerifyPin}
          >
            {verifying ? "Verifying..." : "Verify"}
          </Button>
        </View>
      )}
      <ErrorModal
        modalIsVisible={errorModalIsVisible}
        setModalIsVisible={setErrorModalIsVisible}
        errorTitle="Oooops!"
        errorDescription={errorDescription}
      ></ErrorModal>
      <SuccessModal
        modalIsVisible={successModalIsVisible}
        setModalIsVisible={setSuccessModalIsVisible}
        modalTitle="Success!"
        modalDescription={successDescription}
      ></SuccessModal>
    </Background>
  );
};

export default EmailVerification;
