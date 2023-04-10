import Background from "../../Background/background";
import {Text} from "react-native";
import {styles} from "./styles.email-verification";
import Button from "../../Shared/Button/button";
import {WHITE} from "../../../utils/colors";
import {React} from "react";
import AuthenticationController from "../../../utils/controllers/AuthenticationController";

const EmailVerification = ({user}) => {
    const handleSendVerifyLink = async () => {
        const controller = new AuthenticationController(user);
        const {email} = await controller.sendVerificationMail();
        if(email){
            alert(`Mail sent to: ${email}`);
        } else{
            alert(`There was a problem sending the mail, try again later`);
        }
    }

    const handleAlreadyVerify = async () => {
        await user.reload();
        await user.getIdToken(true);
    }

    return(
        <Background
            fromColor={"rgb(185, 213, 123)"}
            toColor={"rgb(254,254,253)"}
            styles={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", height: "100%", flexDirection: "column"}}
        >
            <Text style={styles.title}>Please, verify your email</Text>
            <Button
                textColor={WHITE}
                fontSize={16}
                style={styles.verifyButton}
                onPress={handleSendVerifyLink}
            >
                Send verification link
            </Button>

            <Button
                textColor={WHITE}
                fontSize={16}
                style={styles.verifyButton}
                onPress={handleAlreadyVerify}
            >
                I already verified my email
            </Button>
        </Background>
    )
}

export default EmailVerification;
