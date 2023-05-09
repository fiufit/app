import AuthenticationController from "../../../utils/controllers/AuthenticationController";
import Background from "../../Background/background";
import Button from "../../Shared/Button/button";
import ErrorModal from "../../Shared/Modals/ErrorModal/ErrorModal";
import SuccessModal from "../../Shared/Modals/SuccessModal/SuccessModal";
import { Text } from "react-native";
import { WHITE } from "../../../utils/colors";
import { styles } from "./styles.email-verification";
import { useState } from "react";

const EmailVerification = ({ user }) => {
  const [errorModalIsVisible, setErrorModalIsVisible] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [successModalIsVisible, setSuccessModalIsVisible] = useState(false);
  const [successDescription, setSuccessDescription] = useState("");
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

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Text style={styles.title}>Please, verify your email</Text>
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
