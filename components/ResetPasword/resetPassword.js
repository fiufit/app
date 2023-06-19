import Background from "../Background/background";
import Back from "../Shared/Back/back";
import { styles } from "./styles.reset-password";
import { Keyboard, Text, View } from "react-native";
import MailIcon from "../../assets/images/general/mailIcon.svg";
import Input from "../Shared/Input/input";
import { useState } from "react";
import { WHITE } from "../../utils/colors";
import Button from "../Shared/Button/button";
import { sendPasswordResetEmailTo } from "../../firebase";
import SuccessModal from "../Shared/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../Shared/Modals/ErrorModal/ErrorModal";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendResetLink = async () => {
    if (loading) return;
    if (email) {
      Keyboard.dismiss();
      setLoading(true);
      try {
        await sendPasswordResetEmailTo(email);
        setShowSuccesModal(true);
        setEmail("");
      } catch (e) {
        console.log(e);
        setShowErrorModal(true)
      }
      setLoading(false);
    } else {
      setError(true);
    }
  };

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
      }}
    >
      <Back onPress={() => navigation.pop()} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Hey there,</Text>
        <Text style={styles.subtitle}>Reset your password!</Text>
      </View>
      <Input
        value={email}
        placeholder={error ? "Enter an email!" : "Enter your account email"}
        placeholderTextColor={error ? "red" : null}
        onChangeText={(email) => {
          setEmail(email);
          setError(false);
        }}
        width={"80%"}
        height={48}
        fontSize={12}
        marginTop={0}
        left={<MailIcon height={18} width={18} />}
      />
      <Button
        textColor={WHITE}
        fontSize={16}
        style={styles.button}
        onPress={handleSendResetLink}
      >
        {loading ? "Sending email..." : "Send reset link"}
      </Button>
      <SuccessModal
        setModalIsVisible={setShowSuccesModal}
        modalIsVisible={showSuccesModal}
        modalDescription={"Check your inbox and reset your password!"}
        modalTitle={"Email sent!"}
      />
      <ErrorModal
        setModalIsVisible={setShowErrorModal}
        modalIsVisible={showErrorModal}
        errorTitle={"Oooops!"}
        errorDescription={
            "There was an error while sending your reset link, please verify your email and try again!"
        }
      />
    </Background>
  );
};

export default ResetPassword;
